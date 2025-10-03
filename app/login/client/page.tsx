// @ts-nocheck
"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, User, Shield, Star, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/lib/supabase-client";

export default function ClientLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [onlineCount, setOnlineCount] = useState(175); // Fixed initial value to prevent hydration mismatch
  const router = useRouter();

  // Generate dense placeholder markers across the UK using real city lat/lon projected to iframe bbox
  const tradeCategories = useMemo(
    () => [
      { name: "Plumber", color: "#2563eb" },
      { name: "Electrician", color: "#facc15" },
      { name: "Builder", color: "#16a34a" },
      { name: "Cleaner", color: "#9333ea" },
      { name: "Roofer", color: "#ea580c" },
      { name: "Carpenter", color: "#0ea5e9" },
    ],
    []
  );

  const UK_BBOX = { minLon: -11.0, maxLon: 2.1, minLat: 49.5, maxLat: 59.0 };

  const ukCities = useMemo(
    () => [
      { name: "London", lat: 51.5074, lon: -0.1278 },
      { name: "Manchester", lat: 53.4808, lon: -2.2426 },
      { name: "Birmingham", lat: 52.4862, lon: -1.8904 },
      { name: "Leeds", lat: 53.8008, lon: -1.5491 },
      { name: "Glasgow", lat: 55.8642, lon: -4.2518 },
      { name: "Edinburgh", lat: 55.9533, lon: -3.1883 },
      { name: "Cardiff", lat: 51.4816, lon: -3.1791 },
      { name: "Belfast", lat: 54.5973, lon: -5.9301 },
      { name: "Bristol", lat: 51.4545, lon: -2.5879 },
      { name: "Liverpool", lat: 53.4084, lon: -2.9916 },
      { name: "Newcastle", lat: 54.9783, lon: -1.6178 },
      { name: "Sheffield", lat: 53.3811, lon: -1.4701 },
      { name: "Nottingham", lat: 52.9548, lon: -1.1581 },
      { name: "Leicester", lat: 52.6369, lon: -1.1398 },
      { name: "Cambridge", lat: 52.2053, lon: 0.1218 },
      { name: "Oxford", lat: 51.7520, lon: -1.2577 },
      { name: "Brighton", lat: 50.8225, lon: -0.1372 },
      { name: "Southampton", lat: 50.9097, lon: -1.4043 },
      { name: "Portsmouth", lat: 50.8198, lon: -1.0880 },
      { name: "Plymouth", lat: 50.3755, lon: -4.1427 },
      { name: "Exeter", lat: 50.7184, lon: -3.5339 },
      { name: "Norwich", lat: 52.6309, lon: 1.2974 },
      { name: "York", lat: 53.9590, lon: -1.0815 },
      { name: "Dundee", lat: 56.4620, lon: -2.9707 },
      { name: "Aberdeen", lat: 57.1497, lon: -2.0943 },
      { name: "Inverness", lat: 57.4778, lon: -4.2247 },
      { name: "Swansea", lat: 51.6214, lon: -3.9436 },
      { name: "Newport", lat: 51.5842, lon: -2.9977 },
      { name: "Reading", lat: 51.4543, lon: -0.9781 },
      { name: "Milton Keynes", lat: 52.0406, lon: -0.7594 },
      { name: "Coventry", lat: 52.4068, lon: -1.5197 },
      { name: "Hull", lat: 53.7457, lon: -0.3367 },
      { name: "Stoke-on-Trent", lat: 53.0027, lon: -2.1794 },
      { name: "Derby", lat: 52.9225, lon: -1.4746 },
      { name: "Wolverhampton", lat: 52.5862, lon: -2.1288 },
      { name: "Bath", lat: 51.3758, lon: -2.3599 },
      { name: "Bournemouth", lat: 50.7192, lon: -1.8808 },
      { name: "Ipswich", lat: 52.0567, lon: 1.1482 },
      { name: "Chelmsford", lat: 51.7356, lon: 0.4685 },
      { name: "Luton", lat: 51.8787, lon: -0.4200 },
    ],
    []
  );

  const projectToPercent = (lat: number, lon: number) => {
    // More accurate bounds matching the Google Maps embed
    const ACCURATE_UK_BOUNDS = {
      north: 58.8,
      south: 49.8,
      east: 1.8,
      west: -10.5
    };
    
    const x = ((lon - ACCURATE_UK_BOUNDS.west) / (ACCURATE_UK_BOUNDS.east - ACCURATE_UK_BOUNDS.west)) * 100;
    const y = ((ACCURATE_UK_BOUNDS.north - lat) / (ACCURATE_UK_BOUNDS.north - ACCURATE_UK_BOUNDS.south)) * 100;
    
    return {
      left: Math.min(95, Math.max(5, x)),
      top: Math.min(95, Math.max(5, y)),
    };
  };

  // Removed old fake markers - now using real city-based markers

  // Handle marker click to redirect to find tradespeople page
  const handleMarkerClick = (trade: string, city: string) => {
    // Navigate to find-tradespeople page with pre-filled search
    router.push(`/find-tradespeople?search=${encodeURIComponent(trade)}&location=${encodeURIComponent(city)}`);
  };

  useEffect(() => {
    // Prefill email if remembered
    const savedEmail = localStorage.getItem("clientRememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
    
    // Update online count after hydration to avoid mismatch
    setOnlineCount(Math.floor(Math.random() * 50) + 150);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check email and password directly in database
      const { data: userData, error: userError } = await supabase
        .from("clients")
        .select("id, email, first_name, is_verified")
        .eq("email", email)
        .eq("password_hash", password)
        .maybeSingle();

      if (userError || !userData) {
        setError("Invalid email or password. Please try again.");
        setIsLoading(false);
        return;
      }

      if (!userData.is_verified) {
        setError(
          "Please verify your email address before logging in. Check your inbox for the verification email."
        );
        setIsLoading(false);
        return;
      }

      setSuccess("Login successful! Redirecting...");

      // Store user info and token in localStorage
      const clientToken = `client_${userData.id}_${Date.now()}`;
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: userData.id,
          email: userData.email,
          firstName: userData.first_name,
          isVerified: userData.is_verified,
          type: "client",
        })
      );
      localStorage.setItem("clientToken", clientToken);

      // Remember email if opted in
      if (rememberMe) {
        localStorage.setItem("clientRememberEmail", email);
      } else {
        localStorage.removeItem("clientRememberEmail");
      }

      // Check if there's a redirect URL stored
      const redirectUrl = localStorage.getItem("redirectAfterLogin");

      // Redirect to stored URL or default dashboard
      setTimeout(() => {
        if (redirectUrl) {
          localStorage.removeItem("redirectAfterLogin"); // Clean up
          window.location.href = redirectUrl;
        } else {
          window.location.href = "/dashboard/client";
        }
      }, 1500);
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex flex-col items-center justify-center p-6 sm:p-8 gap-6 overflow-hidden">
      {/* Background accents */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-6 md:gap-8 items-start">
        {/* Left: Login card (moved left) */}
        <div className="order-1 md:order-1 p-[1.5px] rounded-3xl bg-gradient-to-b from-blue-200/70 to-yellow-200/70 shadow-2xl">
          <Card className="w-full rounded-3xl shadow-2xl border border-white/70 bg-white/95 backdrop-blur">
          <CardHeader className="text-center pb-4 sm:pb-6">
            {/* Brand text removed as requested */}
            {/* Trust badge */}
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-800">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-500" />
              Trusted by 50,000+ UK customers
            </div>
            <div className="flex items-center justify-center mb-3">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <User className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-[26px] sm:text-3xl font-bold text-[#fdbd18] mb-1">
              Sign in to your account
            </CardTitle>
            <p className="text-gray-600 text-sm sm:text-base">Manage bookings, messages, and saved pros.</p>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <Label
                  htmlFor="email"
                  className="flex items-center mb-2 text-sm font-semibold text-gray-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-12 text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="password"
                  className="flex items-center mb-2 text-sm font-semibold text-gray-700"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-12 text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 rounded-lg pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c) => setRememberMe(c === true)} />
                  <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
                </div>
                <Link
                  href="/forgot-password?type=client"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                >
                  Forgot password?
                </Link>
              </div>

              {error && (
                <Alert
                  variant="destructive"
                  className="border-red-200 bg-red-50"
                >
                  <AlertDescription className="text-red-800">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <AlertDescription className="text-green-800">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-[#fdbd18]">Enter your details</span>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>

              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  Do not have a client account?{" "}
                  <Link
                    href="/register/client"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Register here
                  </Link>
                </p>
                <p className="text-sm text-gray-600">
                  Are you a tradesperson?{" "}
                  <Link
                    href="/login/trade"
                    className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Login here
                  </Link>
                </p>
                <div className="pt-1">
                  <Link href="/contact" className="text-xs text-gray-500 hover:text-gray-700 underline">Need help? Contact support</Link>
                </div>
              </div>

              {/* Benefits bullets */}
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                <li className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                  <CheckCircle className="h-4 w-4 text-green-600" /> No hidden fees
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                  <Shield className="h-4 w-4 text-blue-700" /> Secure login
                </li>
                <li className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 border border-gray-200 rounded-md px-2 py-1">
                  <Star className="h-4 w-4 text-yellow-500" /> Top-rated pros
                </li>
              </ul>

              {/* Primary CTA under login for better focus */}
              <div className="mt-5">
                <Link
                  href="/register/client"
                  className="inline-flex items-center justify-center w-full h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold shadow hover:from-yellow-500 hover:to-yellow-600"
                >
                  Create a free account
                </Link>
              </div>

            </form>
          </CardContent>
          </Card>
        </div>

        {/* Right: UK map with dense active trade markers + feature cards */}
        <div className="order-2 md:order-2 flex flex-col gap-4">
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-blue-200/80 to-yellow-200/80 shadow-xl">
            <div className="relative rounded-[14px] overflow-hidden border border-white/70 bg-white/90 backdrop-blur">
              {/* Interactive Map with Real-looking Markers */}
              <div className="relative w-full h-[360px] md:h-[440px] bg-gradient-to-br from-blue-100 to-green-100">
                {/* Base map using Google Maps embed for more realistic appearance */}
              <iframe
                title="UK coverage map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9933496.689157944!2d-8.644409999999999!3d54.2361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2suk!4v1699999999999!5m2!1sen!2suk&iwloc=&output=embed"
                  className="w-full h-full rounded-[14px] pointer-events-none"
                loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                
                {/* Realistic tradesperson markers with hover effects */}
                <div className="absolute inset-0 pointer-events-none">
                  {ukCities.slice(0, 25).map((city, idx) => {
                    const pos = projectToPercent(city.lat, city.lon);
                    const tradeType = tradeCategories[idx % tradeCategories.length];
                    const isActive = idx % 3 === 0; // Make some markers "active"
                    
                    return (
                      <div
                        key={city.name}
                        className="absolute group pointer-events-auto cursor-pointer"
                        style={{ 
                          top: `${pos.top}%`, 
                          left: `${pos.left}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        onClick={() => handleMarkerClick(tradeType.name, city.name)}
                        title={`Click to find ${tradeType.name} in ${city.name}`}
                      >
                        {/* Marker pin */}
                        <div className={`relative ${isActive ? 'animate-bounce' : ''}`}>
                          <div 
                            className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold transition-transform hover:scale-125"
                            style={{ backgroundColor: tradeType.color }}
                          >
                            {tradeType.name.charAt(0)}
                          </div>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                            {city.name} - {tradeType.name} • Click to search
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-black"></div>
                          </div>
                          
                          {/* Pulse effect for active markers */}
                          {isActive && (
                            <div 
                              className="absolute inset-0 rounded-full animate-ping opacity-30"
                              style={{ backgroundColor: tradeType.color }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Live activity indicator */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur rounded-lg px-3 py-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-gray-700">
                      {onlineCount}+ tradespeople online
                    </span>
                  </div>
                </div>
                
                {/* Legend */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur rounded-lg p-3 shadow-lg">
                  <div className="text-xs font-medium text-gray-700 mb-2">Available Now</div>
                  <div className="grid grid-cols-2 gap-1">
                    {tradeCategories.slice(0, 4).map((trade) => (
                      <div key={trade.name} className="flex items-center gap-1">
                        <div 
                          className="w-3 h-3 rounded-full border border-white shadow-sm"
                          style={{ backgroundColor: trade.color }}
                        />
                        <span className="text-xs text-gray-600">{trade.name}</span>
                  </div>
                ))}
                  </div>
                </div>
              </div>

              {/* Subtle frame */}
              <div className="pointer-events-none absolute inset-0 ring-1 ring-black/5" />
            </div>
          </div>

          {/* Restored feature cards under the map */}
          <div className="p-[1.5px] rounded-3xl bg-gradient-to-br from-blue-200/70 to-yellow-200/70 shadow-xl">
            <div className="relative bg-white/95 backdrop-blur rounded-3xl border border-white/70 p-6 transition-transform duration-200 hover:-translate-y-[2px]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#fdbd18] rounded-t-3xl" />
              <h2 className="text-xl font-bold text-gray-900 mb-3">Why MyApproved</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 border border-blue-100">
                    <Shield className="h-4 w-4 text-blue-700" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Verified pros</p>
                    <p className="text-sm text-gray-600">ID, insurance, and checks for peace of mind.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-yellow-50 border border-yellow-100">
                    <Star className="h-4 w-4 text-yellow-500" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#fdbd18]">Top-rated pros</p>
                    <p className="text-sm text-gray-600">5★ reviews from thousands of UK customers.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-green-50 border border-green-100">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Fast booking</p>
                    <p className="text-sm text-gray-600">Match quickly with trusted local specialists.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-[1.5px] rounded-3xl bg-gradient-to-br from-blue-200/70 to-yellow-200/70 shadow-xl">
            <div className="relative bg-white/95 backdrop-blur rounded-3xl border border-white/70 p-5 transition-transform duration-200 hover:-translate-y-[2px]">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#fdbd18] rounded-t-3xl" />
              <div className="flex items-center gap-2 text-sm text-gray-800">
                <Star className="h-4 w-4 text-[#fdbd18]" />
                4.9/5 from 12k+ verified reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
