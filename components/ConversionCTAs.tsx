import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowRight, 
  Phone, 
  MessageCircle, 
  Clock, 
  Shield, 
  Star, 
  CheckCircle,
  Zap,
  Users,
  Award,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Sticky Bottom CTA
export function StickyBottomCTA() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-yellow-400 to-yellow-500 border-t border-yellow-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-blue-900">
              <Zap className="w-5 h-5" />
              <span className="font-bold text-sm">Free Instant Quotes</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-blue-800">
              <span className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Verified Trades
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3 h-3" />
                £2M Insured
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                60s Response
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-xl shadow-lg"
              onClick={() => document.getElementById('ai-quote-trigger')?.click()}
            >
              Get Free Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <button
              onClick={() => setIsVisible(false)}
              className="text-blue-900 hover:text-blue-700 p-1"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Floating Action Button
export function FloatingCTA() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
        
        <Button
          className="relative bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110"
          onClick={() => document.getElementById('ai-quote-trigger')?.click()}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
          Get Free Quote
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
        </div>
      </div>
    </div>
  );
}

// Exit Intent Modal
interface ExitIntentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExitIntentModal({ isOpen, onClose }: ExitIntentModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-3xl p-8 max-w-md mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-red-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Wait! Don't Leave Empty-Handed</h3>
          <p className="text-gray-600 mb-6">
            Get your free quote in just 60 seconds. No obligation, no spam - just trusted tradespeople ready to help.
          </p>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>10,000+ verified tradespeople</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>£2M+ insurance protection</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span>Average 5-minute response time</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <Button 
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-3 rounded-xl"
              onClick={() => {
                onClose();
                document.getElementById('ai-quote-trigger')?.click();
              }}
            >
              Get My Free Quote Now
            </Button>
            
            <button
              onClick={onClose}
              className="w-full text-gray-500 hover:text-gray-700 text-sm"
            >
              No thanks, I'll find someone else
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Urgency Banner
export function UrgencyBanner() {
  return (
    <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>🔥 High Demand Alert</span>
        </div>
        <span>147 people requested quotes in the last hour</span>
        <Button 
          size="sm"
          className="bg-white text-red-600 hover:bg-gray-100 font-bold px-4 py-1 rounded-full text-xs"
          onClick={() => document.getElementById('ai-quote-trigger')?.click()}
        >
          Get Yours Now
        </Button>
      </div>
    </div>
  );
}

// Social Proof CTA
export function SocialProofCTA() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-3xl p-8 text-center">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="flex -space-x-2">
            {[
              'https://randomuser.me/api/portraits/women/68.jpg',
              'https://randomuser.me/api/portraits/men/12.jpg',
              'https://randomuser.me/api/portraits/women/17.jpg',
              'https://randomuser.me/api/portraits/men/33.jpg'
            ].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Customer ${i + 1}`}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
              ))}
            </div>
            <div className="text-sm text-gray-600">50,000+ happy customers</div>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Join Thousands of Satisfied Customers
        </h3>
        <p className="text-gray-600 mb-6">
          "Best decision I made for my home renovation. Professional, reliable, and great value!" - Sarah T.
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">4.9★</div>
            <div className="text-xs text-gray-600">Average Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">98%</div>
            <div className="text-xs text-gray-600">Would Recommend</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">5min</div>
            <div className="text-xs text-gray-600">Avg Response</div>
          </div>
        </div>
        
        <Button 
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
          onClick={() => document.getElementById('ai-quote-trigger')?.click()}
        >
          Get My Free Quote
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}

// Emergency CTA
export function EmergencyCTA() {
  return (
    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
          <Phone className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="text-lg font-bold mb-1">Emergency? Need Help Now?</h4>
          <p className="text-red-100 text-sm">24/7 emergency tradespeople available</p>
        </div>
        <div className="text-right">
          <Button 
            className="bg-white text-red-600 hover:bg-gray-100 font-bold px-6 py-2 rounded-xl"
          >
            Call Now
          </Button>
          <div className="text-xs text-red-200 mt-1">0800 123 4567</div>
        </div>
      </div>
    </div>
  );
}

// Trust Signals CTA
export function TrustSignalsCTA() {
  return (
    <div className="bg-white border-2 border-blue-200 rounded-2xl p-6">
      <div className="text-center mb-4">
        <h4 className="text-xl font-bold text-gray-900 mb-2">Why Choose MyApproved?</h4>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <Shield className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">Fully Insured</div>
            <div className="text-xs text-gray-600">£2M+ Protection</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">ID Verified</div>
            <div className="text-xs text-gray-600">Background Checked</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
            <Star className="w-5 h-5 text-yellow-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">Top Rated</div>
            <div className="text-xs text-gray-600">4.9★ Average</div>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
            <Award className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <div className="font-semibold text-sm">Quality Guaranteed</div>
            <div className="text-xs text-gray-600">Money Back Promise</div>
          </div>
        </div>
      </div>
      
      <Button 
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-xl"
        onClick={() => document.getElementById('ai-quote-trigger')?.click()}
      >
        Get Protected Quote Now
        <Shield className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}
