import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleDocumentUpload,
  handleDocumentSummary,
  handleGetDocuments,
} from "./routes/documents";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Document API routes
  app.get("/api/documents", handleGetDocuments);
  app.post("/api/documents/upload", handleDocumentUpload);
  app.get("/api/documents/:documentId/summary", handleDocumentSummary);

  return app;
}
