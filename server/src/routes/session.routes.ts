import { sessionService } from "@/services/session.service";
import { Router } from "express";

export const sessionRouter = Router();

sessionRouter.get("/:sessionId/messages", (_req, res) => {
  res.status(501).json({
    error: "Not Implemented",
    message:
      "Implement GET /api/sessions/:sessionId/messages to restore session history.",
  });
});

sessionRouter.post("/:sessionId/close", async (req, res) => {
  await sessionService.closeSession(req.params.sessionId);
  res.status(200).json({ closed: true });
});
