<h1 align="center">⚖️ AI Legal Summary Assistant</h1>
<p align="center">
  <b>Summarize legal documents in seconds using AI</b><br/>
  🧠 Fast | ⚡ Smart | 📄 PDF-friendly
</p>

<p align="center">
  <img src="https://your-image-url.com/demo.gif" alt="Demo GIF" width="700"/>
</p>

---

## 🌟 Overview

**AI Legal Summary Assistant** is a smart, modern web app that helps you:
- 📥 Upload lengthy court judgments, legal briefs, or contracts (PDF)
- 🧠 Get instant, AI-generated summaries
- ⚡ Save time reading through complex legal texts

Built with a **FastAPI backend**, a **custom NLP/LLM model**, and a slick **React + Tailwind frontend**.

---

## 🧩 Tech Stack

| **Layer**     | **Tech**                             |
|--------------|---------------------------------------|
| 🖥️ Frontend   | React, TailwindCSS, shadcn/ui         |
| ⚙️ Backend    | FastAPI, Uvicorn, Python              |
| 🤖 AI Model  | Custom LLM/NLP model (plug & play)     |
| 📄 PDF Parser | PyMuPDF (fitz)                        |

---

## 🚀 Features

✅ Upload legal documents (PDFs)  
✅ Automatic summarization using AI  
✅ Clean, minimal UI (with Tailwind + shadcn/ui)  
✅ FastAPI backend with real-time summary generation  
✅ Completely modular and customizable

---

## 🔧 Project Structure

```bash
ai-legal-summary-assistant/
│
├── backend/
│   ├── app.py           # FastAPI server + model route
│   ├── model.py         # Your AI summarizer logic
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   └── components/  # React components
│   ├── public/
│   └── vite.config.ts
│
└── README.md
