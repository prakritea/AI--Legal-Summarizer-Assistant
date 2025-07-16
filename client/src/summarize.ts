// client/api/summarize.ts
export const summarizeDoc = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/summarize", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to summarize document");
  }

  const data = await response.json();
  return data.summary;
};
