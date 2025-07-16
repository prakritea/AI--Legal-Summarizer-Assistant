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
  Search,
  Filter,
  Download,
  Eye,
  MoreVertical,
  Calendar,
  Zap,
  Clock,
  Trash2,
  Edit,
  AlertTriangle,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Document, DocumentsListResponse } from "@shared/api";

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/documents");
      const data = (await response.json()) as DocumentsListResponse;
      setDocuments(data.documents);
    } catch (error) {
      console.error("Error fetching documents:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getStatusColor = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-700 bg-green-50";
      case "processing":
        return "text-blue-700 bg-blue-50";
      case "error":
        return "text-red-700 bg-red-50";
      default:
        return "text-legal-700 bg-legal-50";
    }
  };

  const getStatusIcon = (status: Document["status"]) => {
    switch (status) {
      case "completed":
        return <Zap className="h-4 w-4" />;
      case "processing":
        return <Clock className="h-4 w-4 animate-spin" />;
      case "error":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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
                  className="text-legal-600 hover:text-legal-900 transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/documents"
                  className="text-legal-900 font-medium border-b-2 border-primary pb-4"
                >
                  Documents
                </Link>
              </nav>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
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
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-legal-900 mb-2">
            Document Library
          </h1>
          <p className="text-legal-600">
            Browse and manage all your legal documents
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-legal-400" />
                <input
                  type="text"
                  placeholder="Search documents by name or type..."
                  className="w-full pl-10 pr-4 py-2 border border-legal-200 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  Sort
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-legal-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-legal-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-legal-200 rounded mb-2"></div>
                  <div className="h-3 bg-legal-200 rounded w-3/4"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map((doc) => (
              <Card
                key={doc.id}
                className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg truncate" title={doc.name}>
                    {doc.name}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between">
                    <span>{doc.type}</span>
                    <span
                      className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        doc.status,
                      )}`}
                    >
                      {getStatusIcon(doc.status)}
                      <span className="ml-1 capitalize">{doc.status}</span>
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-legal-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(doc.uploadDate).toLocaleDateString()}
                      <span className="ml-auto">{doc.size}</span>
                    </div>

                    {doc.status === "completed" && doc.summary && (
                      <div className="p-3 bg-legal-50 rounded-lg">
                        <h4 className="font-medium text-legal-900 mb-2 flex items-center text-sm">
                          <Zap className="h-4 w-4 mr-2 text-primary" />
                          Summary
                        </h4>
                        <p className="text-legal-700 text-sm leading-relaxed line-clamp-3">
                          {doc.summary}
                        </p>
                      </div>
                    )}

                    {doc.status === "processing" && (
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-700">
                          <Clock className="h-4 w-4 mr-2 animate-spin" />
                          <span className="text-sm font-medium">
                            Processing...
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!loading && filteredDocuments.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-12 w-12 text-legal-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-legal-900 mb-2">
                {searchTerm ? "No documents found" : "No documents yet"}
              </h3>
              <p className="text-legal-600 mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Upload your first document to get started"}
              </p>
              {!searchTerm && (
                <Link to="/dashboard">
                  <Button>Upload Documents</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
