// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, ArrowLeft, Key } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabase = createClient(
  "https://jismdkfjkngwbpddhomx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imppc21ka2Zqa25nd2JwZGRob214Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5Mzc2MzksImV4cCI6MjA2ODUxMzYzOX0.1pK4G-Mu5v8lSdDJUAsPsoDAlK9d7ocFaUH9dd2vl3A"
);

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userType, setUserType] = useState("client"); // "client" or "tradesperson"
  const searchParams = useSearchParams();

  useEffect(() => {
    // Detect user type from URL parameter or referrer
    const type = searchParams.get("type");
    if (type === "tradesperson") {
      setUserType("tradesperson");
    } else if (type === "client") {
      setUserType("client");
    } else {
      // Try to detect from referrer
      const referrer = document.referrer;
      if (referrer.includes("/login/trade")) {
        setUserType("tradesperson");
      } else if (referrer.includes("/login/client")) {
        setUserType("client");
      }
    }
  }, [searchParams]);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (userType === "tradesperson") {
        // Check only tradespeople table
        const { data: tradespersonData, error: tradespersonError } = await supabase
          .from("tradespeople")
          .select("id, email, first_name, is_verified")
          .eq("email", email)
          .single();

        if (tradespersonError || !tradespersonData) {
          setError("No tradesperson account found with this email address.");
          setIsLoading(false);
          return;
        }

        if (!tradespersonData.is_verified) {
          setError("Please verify your email address first before resetting your password.");
          setIsLoading(false);
          return;
        }

        setSuccess("Email verified! Redirecting to password reset...");
        localStorage.setItem("resetEmail", email);
        setTimeout(() => {
          window.location.href = "/reset-password-tradesperson";
        }, 1500);
      } else {
        // Check only clients table
        const { data: clientData, error: clientError } = await supabase
          .from("clients")
          .select("id, email, first_name, is_verified")
          .eq("email", email)
          .single();

        if (clientError || !clientData) {
          setError("No client account found with this email address.");
          setIsLoading(false);
          return;
        }

        if (!clientData.is_verified) {
          setError("Please verify your email address first before resetting your password.");
          setIsLoading(false);
          return;
        }

        setSuccess("Email verified! Redirecting to password reset...");
        localStorage.setItem("resetEmail", email);
        setTimeout(() => {
          window.location.href = "/reset-password-client";
        }, 1500);
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Key className="w-8 h-8 text-blue-600 mr-2" />
            <CardTitle>Forgot Password</CardTitle>
          </div>
          <p className="text-gray-600">
            Enter your email address and we will send you a link to reset your
            password.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>

            <div className="text-center">
              <Link
                href={userType === "tradesperson" ? "/login/trade" : "/login/client"}
                className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </div>

            <div className="text-center text-sm text-gray-600">
              Do not have an account?{" "}
              <Link
                href={userType === "tradesperson" ? "/register/tradesperson" : "/register/client"}
                className="text-blue-600 hover:text-blue-800 hover:underline"
              >
                Register here
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
