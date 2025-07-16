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
  Zap,
  Shield,
  Search,
  Users,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-legal-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-legal-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="bg-primary rounded-lg p-2">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="ml-3 text-xl font-bold text-legal-900">
                  LegalDocs AI
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-legal-600 hover:text-legal-900 transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-legal-600 hover:text-legal-900 transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-legal-600 hover:text-legal-900 transition-colors"
              >
                Pricing
              </a>
              <Button variant="outline" size="sm">
                Sign In
              </Button>
              <Link to="/dashboard">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-legal-600 hover:text-legal-900"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-legal-200">
            <div className="px-4 pt-2 pb-3 space-y-1">
              <a
                href="#features"
                className="block px-3 py-2 text-legal-600 hover:text-legal-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="block px-3 py-2 text-legal-600 hover:text-legal-900"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="block px-3 py-2 text-legal-600 hover:text-legal-900"
              >
                Pricing
              </a>
              <div className="px-3 py-2 space-y-2">
                <Button variant="outline" size="sm" className="w-full">
                  Sign In
                </Button>
                <Link to="/dashboard" className="block">
                  <Button size="sm" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-legal-900 mb-6">
            Transform Legal Documents with
            <span className="text-primary block mt-2">
              AI-Powered Summaries
            </span>
          </h1>
          <p className="text-xl text-legal-600 mb-8 max-w-3xl mx-auto">
            Upload, manage, and instantly summarize legal documents with our
            advanced AI platform. Save hours of reading time and never miss
            critical details again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button size="lg" className="text-lg px-8 py-4">
                Start Summarizing <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8 py-4">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-legal-900 mb-4">
              Everything you need for legal document management
            </h2>
            <p className="text-xl text-legal-600 max-w-2xl mx-auto">
              Streamline your workflow with powerful tools designed specifically
              for legal professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Instant AI Summaries",
                description:
                  "Get comprehensive summaries of any legal document in seconds using advanced AI technology.",
              },
              {
                icon: Upload,
                title: "Easy Document Upload",
                description:
                  "Drag and drop documents or upload from cloud storage. Supports PDF, DOC, and more.",
              },
              {
                icon: Shield,
                title: "Bank-Level Security",
                description:
                  "Your documents are encrypted and stored with enterprise-grade security measures.",
              },
              {
                icon: Search,
                title: "Smart Search",
                description:
                  "Find specific clauses, terms, or information across all your documents instantly.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Share documents and summaries with your team while maintaining strict access controls.",
              },
              {
                icon: CheckCircle,
                title: "Compliance Ready",
                description:
                  "Built to meet legal industry compliance standards and regulations.",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-legal-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-legal-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-legal-50"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-legal-900 mb-4">
              How it works
            </h2>
            <p className="text-xl text-legal-600 max-w-2xl mx-auto">
              Get started in three simple steps and transform your document
              workflow today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Documents",
                description:
                  "Securely upload your legal documents in any format. Our system supports PDFs, Word docs, and more.",
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Our advanced AI analyzes your documents, identifying key clauses, terms, and important information.",
              },
              {
                step: "03",
                title: "Get Summaries",
                description:
                  "Receive comprehensive, accurate summaries that highlight the most critical aspects of your documents.",
              },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-legal-900 mb-4">
                  {step.title}
                </h3>
                <p className="text-legal-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-6">
            Ready to revolutionize your legal workflow?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8">
            Join thousands of legal professionals who trust LegalDocs AI for
            their document management needs.
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Start Free Trial <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-legal-900 text-legal-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="bg-primary rounded-lg p-2">
                  <FileText className="h-6 w-6 text-primary-foreground" />
                </div>
                <span className="ml-3 text-xl font-bold text-white">
                  LegalDocs AI
                </span>
              </div>
              <p className="text-legal-400">
                Transforming legal document management with AI-powered
                intelligence.
              </p>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-legal-700 mt-8 pt-8 text-center">
            <p className="text-legal-400">
              © 2024 LegalDocs AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
