export interface Session {
  id: string;
  createdAt: Date;
  closedAt: Date | null;
  projectId: string;
  status: string;
}

export interface CreateSessionResult {
  sessionId: string;
  url: string;
}
