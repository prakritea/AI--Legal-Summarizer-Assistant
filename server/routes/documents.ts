import { RequestHandler } from "express";
import { DocumentSummaryResponse, DocumentUploadResponse } from "@shared/api";

export const handleDocumentUpload: RequestHandler = (req, res) => {
  // Mock document upload logic
  // In a real app, this would handle file upload to cloud storage,
  // extract text content, and trigger AI summarization

  const mockResponse: DocumentUploadResponse = {
    id: Math.random().toString(36).substr(2, 9),
    name: req.body.filename || "uploaded_document.pdf",
    status: "processing",
    message: "Document uploaded successfully and is being processed",
  };

  res.json(mockResponse);
};

export const handleDocumentSummary: RequestHandler = (req, res) => {
  const { documentId } = req.params;

  // Mock AI summarization response
  // In a real app, this would call an AI service like OpenAI, Claude, etc.
  const mockSummaries = [
    "This employment agreement outlines the terms of employment including a 3-month probationary period, competitive salary package with annual reviews, comprehensive health benefits, and standard confidentiality clauses. The contract includes provisions for remote work flexibility and professional development opportunities.",
    "Commercial lease agreement for office space in downtown area with a 5-year initial term and two 5-year renewal options. Monthly rent includes utilities and maintenance, with annual escalation clauses tied to CPI. The lease includes parking allocation and early termination penalties.",
    "Partnership memorandum of understanding establishing the framework for collaboration between two technology companies. The MOU covers intellectual property sharing, joint development initiatives, revenue sharing models, and dispute resolution mechanisms.",
    "Software licensing agreement permitting the use of proprietary technology with specific usage limitations and compliance requirements. The agreement includes support terms, update provisions, and liability limitations.",
    "Non-disclosure agreement with standard confidentiality provisions covering proprietary information, trade secrets, and business strategies. The agreement has a 5-year term with survival clauses for certain obligations.",
  ];

  const response: DocumentSummaryResponse = {
    documentId,
    summary: mockSummaries[Math.floor(Math.random() * mockSummaries.length)],
    confidence: Math.floor(Math.random() * 20) + 80, // 80-100%
    keyTerms: [
      "confidentiality clauses",
      "termination provisions",
      "liability limitations",
      "intellectual property",
      "dispute resolution",
    ],
    status: "completed",
  };

  res.json(response);
};

export const handleGetDocuments: RequestHandler = (req, res) => {
  // Mock documents list
  const mockDocuments = [
    {
      id: "doc1",
      name: "Employment_Agreement_2024.pdf",
      type: "Employment Contract",
      uploadDate: "2024-01-15",
      summary:
        "Standard employment agreement with confidentiality clauses, 3-month probation period, and competitive benefits package.",
      status: "completed",
      size: "2.4 MB",
    },
    {
      id: "doc2",
      name: "Lease_Agreement_Downtown.pdf",
      type: "Lease Agreement",
      uploadDate: "2024-01-14",
      summary:
        "Commercial lease for downtown office space, 5-year term with renewal options and escalation clauses.",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: "doc3",
      name: "Partnership_MOU_TechCorp.pdf",
      type: "MOU",
      uploadDate: "2024-01-13",
      summary: "",
      status: "processing",
      size: "3.1 MB",
    },
  ];

  res.json({ documents: mockDocuments });
};
