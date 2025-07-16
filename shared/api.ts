/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

/**
 * Document-related API types
 */
export interface DocumentUploadResponse {
  id: string;
  name: string;
  status: "processing" | "completed" | "error";
  message: string;
}

export interface DocumentSummaryResponse {
  documentId: string;
  summary: string;
  confidence: number;
  keyTerms: string[];
  status: "processing" | "completed" | "error";
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  summary: string;
  status: "processing" | "completed" | "error";
  size: string;
}

export interface DocumentsListResponse {
  documents: Document[];
}
