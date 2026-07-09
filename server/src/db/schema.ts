import { randomUUID } from "crypto";
import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, check } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text()
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  rootPath: text("root_path").notNull(),
  name: text("name").notNull(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .default(sql`(unixepoch() * 1000)`),
});

export const sessions = sqliteTable(
  "sessins",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    projectId: text("project_id")
      .notNull()
      .references(() => projects.id),
    status: text("title").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
    closedAt: integer("closed_at", { mode: "timestamp_ms" }),
  },
  (table) => [check("role_check", sql`${table.status} IN ('ACTIVE', 'CLOSED')`)],
);

export const messages = sqliteTable(
  "messages",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => randomUUID()),
    sessionId: text("session_id").references(() => sessions.id),
    content: text("title").notNull(),
    role: text("role").notNull(),
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .default(sql`(unixepoch() * 1000)`),
  },
  (table) => [check("role_check", sql`${table.role} IN ('USER', 'SYSTEM')`)],
);
