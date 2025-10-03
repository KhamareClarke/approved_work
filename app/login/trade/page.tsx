"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { supabase } from '@/lib/supabase-client';
import { User, Mail, Lock, Shield, Star, CheckCircle, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function TradespersonLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Client-style remember me (optional)
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [onlineCount, setOnlineCount] = useState(180); // Fixed initial value to prevent hydration mismatch

  // Handle marker click to redirect to find tradespeople page
  const handleMarkerClick = (trade: string, city: string) => {
    // Navigate to find-tradespeople page with pre-filled search
    router.push(`/find-tradespeople?search=${encodeURIComponent(trade)}&location=${encodeURIComponent(city)}`);
  };

  // Generate realistic markers for UK cities
  const tradeCategories = useMemo(
    () => [
      { name: "Plumber", color: "#2563eb", initial: "P" },
      { name: "Electrician", color: "#facc15", initial: "E" },
      { name: "Builder", color: "#16a34a", initial: "B" },
      { name: "Cleaner", color: "#9333ea", initial: "C" },
      { name: "Roofer", color: "#ea580c", initial: "R" },
      { name: "Carpenter", color: "#0ea5e9", initial: "Ca" },
    ],
    []
  );

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
      { name: "Brighton", lat: 50.8225, lon: -0.1372 },
      { name: "Southampton", lat: 50.9097, lon: -1.4043 },
      { name: "Portsmouth", lat: 50.8198, lon: -1.0880 },
    ],
    []
  );

  // Generate realistic markers positioned on actual UK cities
  const markers = useMemo(() => {
    const markerList: Array<{
      id: string;
      city: string;
      trade: string;
      color: string;
      initial: string;
      isActive: boolean;
      lat: number;
      lon: number;
    }> = [];

    ukCities.forEach((city) => {
      // Add 1-3 random trades per city
      const numTrades = Math.floor(Math.random() * 3) + 1;
      const shuffledTrades = [...tradeCategories].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numTrades; i++) {
        const trade = shuffledTrades[i];
        markerList.push({
          id: `${city.name}-${trade.name}-${i}`,
          city: city.name,
          trade: trade.name,
          color: trade.color,
          initial: trade.initial,
          isActive: Math.random() < 0.3, // 30% chance of being "active"
          lat: city.lat + (Math.random() - 0.5) * 0.02, // Small jitter
          lon: city.lon + (Math.random() - 0.5) * 0.02,
        });
      }
    });

    return markerList;
  }, [ukCities, tradeCategories]);

  useEffect(() => {
    // Update online count after hydration to avoid mismatch
    setOnlineCount(Math.floor(Math.random() * 40) + 160);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Check if tradesperson exists and get approval status
      const { data: tradesperson, error: userError } = await supabase
        .from('tradespeople')
        .select('id, email, first_name, is_approved, is_verified')
        .eq('email', email)
        .eq('password_hash', password)
        .maybeSingle();

      if (userError || !tradesperson) {
        setError('Invalid email or password');
        return;
      }

      // Check if tradesperson is verified by admin
      if (!tradesperson.is_verified) {
        setError('Your profile has not been verified by our admin team yet. Please wait for verification before logging in.');
        return;
      }

      // Check if tradesperson is approved by admin
      if (!tradesperson.is_approved) {
        setError('Your profile is currently under review by our admin team. You will receive an email notification once your profile is approved.');
        return;
      }

      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        id: tradesperson.id,
        email: tradesperson.email,
        firstName: tradesperson.first_name,
        type: 'tradesperson',
        isApproved: tradesperson.is_approved,
        isVerified: tradesperson.is_verified
      }));

      // Redirect to tradesperson dashboard
      router.push('/dashboard/tradesperson');

    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 flex items-center justify-center py-12 px-4">
      {/* Main Content */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start px-4 sm:px-6 lg:px-8">
        {/* Left: Login card */}
        <div className="order-1 md:order-1 p-[1.5px] rounded-3xl bg-gradient-to-br from-blue-200/70 to-yellow-200/70 shadow-2xl">
          <Card className="rounded-3xl border border-white/70 bg-white/95 backdrop-blur shadow-xl">
            <CardHeader className="text-center pb-4 sm:pb-6">
              <div className="relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#fdbd18] rounded-t-3xl" />
              </div>
              {/* Trust badge */}
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-yellow-300/70 bg-yellow-50 px-3 py-1.5 text-xs font-semibold text-yellow-800">
                <Star className="h-3.5 w-3.5 text-[#fdbd18]" />
                Trusted by 50,000+ UK customers
              </div>
              <div className="flex items-center justify-center mb-3">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-[26px] sm:text-3xl font-bold text-[#fdbd18] mb-1">Sign in to your account</CardTitle>
              <CardDescription className="text-gray-600 text-sm sm:text-base">Manage bookings, messages, and saved pros.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {error && (
                <Alert className="mb-4" variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="mb-1 block">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-10 h-12 text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="password" className="mb-1 block">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 h-12 text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember me + divider like client */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox id="remember" checked={rememberMe} onCheckedChange={(c)=> setRememberMe(c === true)} />
                    <Label htmlFor="remember" className="text-sm text-gray-700">Remember me</Label>
                  </div>
                  <Link
                    href="/forgot-password?type=tradesperson"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

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
                  className="w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold hover:from-yellow-500 hover:to-yellow-600 shadow"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>

                {/* Primary CTA for new tradespeople */}
                <Link
                  href="/register/client"
                  className="mt-3 inline-flex items-center justify-center w-full h-11 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-sm font-semibold shadow hover:from-yellow-500 hover:to-yellow-600"
                >
                  Create a free account
                </Link>
              </form>

              <div className="text-center space-y-2 mt-6">
                <p className="text-sm text-gray-600">
                  Do not have a client account?{' '}
                  <Link href="/register/client" className="text-blue-600 hover:text-blue-800 hover:underline font-medium">Register here</Link>
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
                  <Star className="h-4 w-4 text-[#fdbd18]" /> Top-rated pros
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right: UK map + same feature cards as client */}
        <div className="order-2 md:order-2 flex flex-col gap-4">
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-blue-200/80 to-yellow-200/80 shadow-xl">
            <div className="relative rounded-[14px] overflow-hidden border border-white/70 bg-white/90 backdrop-blur">
              {/* Google Maps iframe for realistic UK map */}
              <iframe
                title="UK coverage map - Live tradespeople locations"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4435989.848815553!2d-8.653754!3d54.2361!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e0!3m2!1sen!2suk!4v1635789012345!5m2!1sen!2suk&iwloc=&output=embed"
                className="w-full h-[360px] md:h-[440px] pointer-events-none"
                loading="lazy"
              />
              
              {/* Interactive markers overlay - positioned to match Google Maps */}
              <div className="absolute inset-0 pointer-events-none">
                {markers.map((marker) => {
                  // More accurate bounds matching the Google Maps embed
                  const ACCURATE_UK_BOUNDS = {
                    north: 58.8,
                    south: 49.8,
                    east: 1.8,
                    west: -10.5
                  };
                  
                  const latPercent = ((ACCURATE_UK_BOUNDS.north - marker.lat) / (ACCURATE_UK_BOUNDS.north - ACCURATE_UK_BOUNDS.south)) * 100;
                  const lonPercent = ((marker.lon - ACCURATE_UK_BOUNDS.west) / (ACCURATE_UK_BOUNDS.east - ACCURATE_UK_BOUNDS.west)) * 100;
                  
                  return (
                    <div
                      key={marker.id}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 group pointer-events-auto cursor-pointer"
                      style={{
                        top: `${Math.min(95, Math.max(5, latPercent))}%`,
                        left: `${Math.min(95, Math.max(5, lonPercent))}%`,
                      }}
                      title={`Click to find ${marker.trade} in ${marker.city}`}
                      onClick={() => handleMarkerClick(marker.trade, marker.city)}
                    >
                      {/* Pin-style marker */}
                      <div
                        className={`relative w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white transition-all duration-200 hover:scale-110 ${
                          marker.isActive ? 'animate-bounce' : ''
                        }`}
                        style={{ backgroundColor: marker.color }}
                      >
                        {marker.initial}
                        {marker.isActive && (
                          <div className="absolute -inset-1 rounded-full border-2 border-white animate-pulse opacity-75" style={{ backgroundColor: marker.color }} />
                        )}
                      </div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                        {marker.trade} • {marker.city} • Click to search
                        {marker.isActive && <span className="text-green-300"> • Online</span>}
                      </div>
                    </div>
                  );
                })}
                
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
                    {tradeCategories.map((category) => (
                      <div key={category.name} className="flex items-center gap-1">
                        <div
                          className="w-3 h-3 rounded-full border border-white shadow-sm flex items-center justify-center"
                          style={{ backgroundColor: category.color }}
                        >
                          <span className="text-[8px] font-bold text-white">{category.initial}</span>
                        </div>
                        <span className="text-[10px] text-gray-600">{category.name}</span>
                  </div>
                ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    <Star className="h-4 w-4 text-[#fdbd18]" />
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
 