import { TerminalRunner } from "@/lib/terminalRunner";
import { sessionService } from "@/services/session.service";
import { Router } from "express";

export const setupRouter = Router();

setupRouter.post("/setup", async (_req, res) => {
  try {
    const reply = await sessionService.createSession();
    const tr = new TerminalRunner();
    tr.start(reply.sessionId);

    return res.status(200).json(reply);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(500).json({
        error: "FAILED",
        message: err.message,
      });
    }
    return res.status(500).json({
      error: "FAILED",
      message: "Internal Server Error",
    });
  }
});
