import { terminalRunner } from "@/lib/terminalRunner";
import type { CreateSessionResult, Session } from "../types/session.types";
import { sessionRepository } from "@/repositories/session.repository";

export class SessionService {
  async createSession(): Promise<CreateSessionResult> {
    const session = await sessionRepository.create();
    return {
      sessionId: session.id,
      url: `/session/${session.id}`,
    };
  }

  async getSession(sessionId: string): Promise<Session | null> {
    return await sessionRepository.findById(sessionId);
  }

  async closeSession(sessionId: string): Promise<void> {
    await sessionRepository.close(sessionId);
    terminalRunner.stop(sessionId);
  }
}

export const sessionService = new SessionService();
