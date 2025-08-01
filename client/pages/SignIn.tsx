import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  Eye, 
  EyeOff,
  ArrowLeft,
  Mail,
  Lock,
  Shield,
  Users,
  Zap
} from "lucide-react";
import { Link } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    organization: '',
    agreeToTerms: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle authentication logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-800 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LegalDocs AI</span>
            </Link>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-12 lg:py-12 bg-brand-800 text-white">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold mb-8">
              Join thousands of legal professionals
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Instant Analysis</h3>
                  <p className="text-white/80">
                    Get comprehensive document summaries in seconds, not hours.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Enterprise Security</h3>
                  <p className="text-white/80">
                    Your sensitive legal documents are protected with bank-level encryption.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Team Collaboration</h3>
                  <p className="text-white/80">
                    Share insights and collaborate with your team in real-time.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-white/10 rounded-xl">
              <blockquote className="text-white/90 italic">
                "LegalDocs AI has transformed our document review process. What used to take 
                hours now takes minutes."
              </blockquote>
              <div className="flex items-center mt-4">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">JD</span>
                </div>
                <div className="ml-3">
                  <p className="font-semibold">Jane Davis</p>
                  <p className="text-white/70 text-sm">Partner at Davis & Associates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-8 lg:flex-none lg:w-[480px] bg-white dark:bg-gray-900 pt-8">
          <div className="mx-auto w-full max-w-md">
            <Card className="shadow-xl border-0 dark:bg-gray-800 dark:border-gray-700">
              <CardHeader className="space-y-4 pb-8 -mt-px">
                <div className="text-center">
                  <CardTitle className="text-2xl font-bold dark:text-white">
                    {isSignUp ? 'Create your account' : 'Welcome back'}
                  </CardTitle>
                  <CardDescription className="text-base mt-2 dark:text-gray-200">
                    {isSignUp 
                      ? 'Start your free trial today - no credit card required'
                      : 'Sign in to your LegalDocs AI account'
                    }
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  {isSignUp && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="dark:text-gray-200">First name</Label>
                          <Input
                            id="firstName"
                            type="text"
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="dark:text-gray-200">Last name</Label>
                          <Input
                            id="lastName"
                            type="text"
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="organization" className="dark:text-gray-200">Organization</Label>
                        <Input
                          id="organization"
                          type="text"
                          placeholder="Your law firm or company"
                          value={formData.organization}
                          onChange={(e) => handleInputChange('organization', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="dark:text-gray-200">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder={isSignUp ? "Create a strong password" : "Enter your password"}
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {isSignUp && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="dark:text-gray-200">Confirm password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        />
                        <Label htmlFor="remember" className="text-sm text-gray-600 dark:text-gray-200">
                          Remember me
                        </Label>
                      </div>
                      <Link to="/forgot-password" className="text-sm text-brand-800 dark:text-brand-400 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                  )}

                  {isSignUp && (
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.agreeToTerms}
                        onCheckedChange={(checked) => handleInputChange('agreeToTerms', checked as boolean)}
                        required
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-200">
                        I agree to the{' '}
                        <Link to="/terms" className="text-brand-800 dark:text-brand-400 hover:underline">Terms of Service</Link>
                        {' '}and{' '}
                        <Link to="/privacy" className="text-brand-800 dark:text-brand-400 hover:underline">Privacy Policy</Link>
                      </Label>
                    </div>
                  )}

                  <Button type="submit" className="w-full" size="lg">
                    {isSignUp ? 'Create Account' : 'Sign In'}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-200">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </Button>
                  <Button variant="outline" className="w-full">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                    Twitter
                  </Button>
                </div>

                <div className="text-center">
                  <span className="text-gray-600 dark:text-gray-200">
                    {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  </span>
                  {' '}
                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-brand-800 dark:text-brand-400 hover:underline font-medium"
                  >
                    {isSignUp ? 'Sign in' : 'Start free trial'}
                  </button>
                </div>

                {isSignUp && (
                  <div className="text-center text-xs text-gray-500 dark:text-gray-200">
                    By creating an account, you agree to our Terms of Service and Privacy Policy.
                    Your free trial includes 14 days of full access to all features.
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="mt-6 mb-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-200">
                Need help?{' '}
                <Link to="/support" className="text-brand-800 dark:text-brand-400 hover:underline">
                  Contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
