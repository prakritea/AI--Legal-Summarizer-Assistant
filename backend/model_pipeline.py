# model_pipeline.py

import warnings
warnings.filterwarnings("ignore", category=UserWarning)

from langchain_community.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_community.llms import HuggingFacePipeline
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM, pipeline
from langchain_community.llms import HuggingFacePipeline
from langchain.chains import RetrievalQA

def process_pdf_and_summarize(pdf_path: str):
    # Step 1: Load & split
    loader = PyPDFLoader(pdf_path)
    documents = loader.load()
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    chunks = text_splitter.split_documents(documents)

    # Step 2: Embedding
    embedding_model = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
    vectorstore = FAISS.from_documents(chunks, embedding_model)

    # Step 3: Load lightweight model
    model_id = "sshleifer/distilbart-cnn-12-6"
    tokenizer = AutoTokenizer.from_pretrained(model_id)
    model = AutoModelForSeq2SeqLM.from_pretrained(model_id)
    pipe = pipeline("text2text-generation", model=model, tokenizer=tokenizer, max_new_tokens=512)
    llm = HuggingFacePipeline(pipeline=pipe)

    # Step 4: RAG QA Chain
    retriever = vectorstore.as_retriever(search_type="similarity", k=5)
    qa_chain = RetrievalQA.from_chain_type(llm=llm, retriever=retriever, return_source_documents=True)

    # Step 5: Query
    query = """You are a legal expert AI.
    Read the court case and provide:
    1. A brief summary in plain English.
    2. Key legal issues raised.
    3. Referenced legal sections or precedents."""
    
    response = qa_chain.invoke({"query": query})
    
    # Step 6: Return formatted result
    summary = response["result"]
    sources = [
        {
            "page": doc.metadata.get("page", "N/A"),
            "text": doc.page_content.strip()[:500]
        }
        for doc in response["source_documents"]
    ]
    
    return summary, sources
