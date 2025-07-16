import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FileText,
  Upload,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  User,
  Clock,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  summary: string;
  status: "processing" | "completed" | "error";
  size: string;
}

export default function Dashboard() {
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Employment_Agreement_2024.pdf",
      type: "Employment Contract",
      uploadDate: "2024-01-15",
      summary:
        "Standard employment agreement with confidentiality clauses, 3-month probation period, and competitive benefits package.",
      status: "completed",
      size: "2.4 MB",
    },
    {
      id: "2",
      name: "Lease_Agreement_Downtown.pdf",
      type: "Lease Agreement",
      uploadDate: "2024-01-14",
      summary:
        "Commercial lease for downtown office space, 5-year term with renewal options and escalation clauses.",
      status: "completed",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Partnership_MOU_TechCorp.pdf",
      type: "MOU",
      uploadDate: "2024-01-13",
      summary: "",
      status: "processing",
      size: "3.1 MB",
    },
  ]);

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload logic here
      console.log("Files dropped:", e.dataTransfer.files);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Handle file upload logic here
      console.log("File uploaded:", e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-legal-50">
      {/* Header */}
      <header className="bg-white border-b border-legal-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <div className="bg-primary rounded-lg p-2">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="ml-3 text-xl font-bold text-legal-900">
                  LegalDocs AI
                </span>
              </Link>
              <nav className="ml-8 hidden md:flex space-x-6">
                <Link
                  to="/dashboard"
                  className="text-legal-900 font-medium border-b-2 border-primary pb-4"
                >
                  Dashboard
                </Link>
                <Link
                  to="/documents"
                  className="text-legal-600 hover:text-legal-900 transition-colors"
                >
                  Documents
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <User className="h-4 w-4 mr-2" />
                Profile
              </Button>
              <Button variant="ghost" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-legal-900 mb-2">
            Document Dashboard
          </h1>
          <p className="text-legal-600">
            Manage your legal documents and access AI-powered summaries
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="h-5 w-5 mr-2" />
              Upload Documents
            </CardTitle>
            <CardDescription>
              Upload your legal documents to get instant AI summaries
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-legal-300 hover:border-legal-400"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 text-legal-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-legal-900 mb-2">
                Drop files here or click to upload
              </p>
              <p className="text-legal-600 mb-4">
                Supports PDF, DOC, DOCX files up to 10MB
              </p>
              <input
                type="file"
                id="file-upload"
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                multiple
              />
              <Button asChild>
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Choose Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle>Your Documents</CardTitle>
                <CardDescription>
                  {documents.length} documents uploaded
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="border border-legal-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-primary/10 p-3 rounded-lg">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-legal-900 truncate">
                          {doc.name}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-legal-600 mt-1">
                          <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                          <span>{doc.size}</span>
                          <span className="bg-legal-100 text-legal-700 px-2 py-1 rounded-full text-xs">
                            {doc.type}
                          </span>
                        </div>

                        {doc.status === "completed" && doc.summary && (
                          <div className="mt-3 p-3 bg-legal-50 rounded-lg">
                            <h4 className="font-medium text-legal-900 mb-2 flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-primary" />
                              AI Summary
                            </h4>
                            <p className="text-legal-700 text-sm leading-relaxed">
                              {doc.summary}
                            </p>
                          </div>
                        )}

                        {doc.status === "processing" && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="flex items-center text-blue-700">
                              <Clock className="h-4 w-4 mr-2 animate-spin" />
                              <span className="text-sm font-medium">
                                Processing document...
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {documents.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-legal-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-legal-900 mb-2">
                  No documents yet
                </h3>
                <p className="text-legal-600">
                  Upload your first document to get started with AI summaries
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
