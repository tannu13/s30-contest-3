import { projects, sessions } from "@/db/schema";
import type { Session } from "../types/session.types";
import { db } from "@/db/client";
import { eq, sql } from "drizzle-orm";

export class SessionRepository {
  async create(): Promise<Session> {
    const [project] = await db
      .insert(projects)
      .values({
        name: "some-project",
        rootPath: "/some-project",
      })
      .returning();
    const projectId = project?.id;
    if (!projectId) {
      throw new Error("Unable to create a project");
    }
    const [session] = await db
      .insert(sessions)
      .values({
        projectId,
        status: "",
      })
      .returning();
    if (!session) {
      throw new Error("Unable to create a session");
    }

    return session;
  }

  async findById(sessionId: string): Promise<Session | null> {
    const [result] = await db
      .select({
        id: sessions.id,
        createdAt: sessions.createdAt,
        projectId: sessions.projectId,
        status: sessions.status,
        closedAt: sessions.closedAt,
      })
      .from(sessions)
      // .innerJoin(projects, eq(sessions.projectId, projects.id))
      .where(eq(sessions.id, sessionId));
    return result ?? null;
  }

  async close(sessionId: string): Promise<void> {
    await db
      .update(sessions)
      .set({
        closedAt: sql`(unixepoch() * 1000)`,
      })
      .where(eq(sessions.id, sessionId));
  }

  async listActive(): Promise<Session[]> {
    return await db
      .select({
        id: sessions.id,
        createdAt: sessions.createdAt,
        projectId: sessions.projectId,
        status: sessions.status,
        closedAt: sessions.closedAt,
      })
      .from(sessions)
      .where(eq(sessions.status, "ACTIVE"));
  }
}

export const sessionRepository = new SessionRepository();
