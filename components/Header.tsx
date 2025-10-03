"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  User, Wrench, ChevronDown, Phone, MessageCircle, Shield, Star, 
  Menu, X, MapPin, Clock, CheckCircle, Award, Search, Bell
} from 'lucide-react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from './ui/dropdown-menu';
import { Badge } from './ui/badge';

// Placeholder UK flag SVG (can be replaced with a static file if needed)
const UKFlag = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="16" rx="2" fill="#00247D"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="white" strokeWidth="2"/>
    <path d="M0 0L24 16M24 0L0 16" stroke="#CF142B" strokeWidth="1"/>
    <rect x="10" width="4" height="16" fill="white"/>
    <rect y="6" width="24" height="4" fill="white"/>
    <rect x="11" width="2" height="16" fill="#CF142B"/>
    <rect y="7" width="24" height="2" fill="#CF142B"/>
  </svg>
);

export default function Header({ logoSrc = '/logo.svg', onLogoClick }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Premium Trust Bar */}
      <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="flex items-center justify-between">
            <div className="hidden md:flex items-center gap-8 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-3 h-3 text-white" />
                </div>
                <span>10,000+ Verified & Insured Trades</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
                <span>4.9★ Rated by 50,000+ Customers</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <Clock className="w-3 h-3 text-white" />
                </div>
                <span>Average 5min Response Time</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span className="font-semibold">24/7 Emergency: 0800 123 4567</span>
              </div>
              <Badge className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 hover:bg-yellow-300">
                FREE Quotes
              </Badge>
            </div>
          </div>
        </div>
      </div>
      
      <header className={`w-full bg-white sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-xl border-b border-gray-200' : 'shadow-lg border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <button onClick={onLogoClick} className="focus:outline-none group">
                <div className="flex items-center gap-3">
                  <Image 
                    src={logoSrc} 
                    alt="MyApproved Logo" 
                    width={160} 
                    height={160} 
                    className="transition-transform group-hover:scale-105" 
                  />
                  <div className="hidden sm:block">
                    <div className="text-xs text-gray-500 font-medium">Trusted by</div>
                    <div className="text-sm font-bold text-blue-900">50,000+ Customers</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              <Link href="/find-tradespeople" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 relative group">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4" />
                  Find Tradespeople
                </div>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
              
              <Link href="/post-job" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 relative group">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Post a Job
                </div>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
              
              <Link href="/how-it-works" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 relative group">
                How It Works
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
              
              <Link href="/register/tradesperson" className="px-4 py-2 text-gray-700 hover:text-blue-700 font-semibold transition-all duration-200 rounded-lg hover:bg-blue-50 relative group">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Join as Pro
                </div>
                <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
              </Link>
            </nav>

            {/* Actions Section */}
            <div className="flex items-center space-x-3">
              {/* Live Chat Button */}
              <Button variant="ghost" className="hidden md:flex items-center gap-2 text-blue-700 hover:text-blue-900 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all">
                <MessageCircle className="w-4 h-4" />
                <span>Live Chat</span>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              </Button>

              {/* Login Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="hidden sm:flex items-center space-x-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-all">
                    <User className="w-4 h-4" />
                    <span>Login</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-2">
                  <DropdownMenuItem asChild>
                    <Link href="/login/client" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-blue-50">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Homeowner Login</div>
                        <div className="text-xs text-gray-500">Find & book tradespeople</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/login/trade" className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-blue-50">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <Wrench className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <div className="font-semibold">Tradesperson Login</div>
                        <div className="text-xs text-gray-500">Manage jobs & quotes</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Primary CTA Button */}
              <Button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl">
                <span>Get Free Quote</span>
                <div className="ml-2 w-4 h-4 bg-blue-900 bg-opacity-20 rounded-full flex items-center justify-center">
                  <ChevronDown className="w-3 h-3 rotate-[-90deg]" />
                </div>
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                className="lg:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              <Link href="/find-tradespeople" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <Search className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Find Tradespeople</span>
              </Link>
              <Link href="/post-job" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Post a Job</span>
              </Link>
              <Link href="/how-it-works" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <CheckCircle className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">How It Works</span>
              </Link>
              <Link href="/register/tradesperson" className="flex items-center gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors">
                <Award className="w-5 h-5 text-blue-600" />
                <span className="font-semibold">Join as Professional</span>
              </Link>
              
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold py-3 rounded-xl">
                  Get Free Quote
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <User className="w-4 h-4" />
                    Login
                  </Button>
                  <Button variant="outline" className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
