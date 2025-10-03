import React from 'react';
import { Shield, Star, Users, Award, CheckCircle, TrendingUp } from 'lucide-react';

const AuthorityTrustSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            Trusted Across the UK
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Britain's most trusted platform for connecting homeowners with verified tradespeople
          </p>
        </div>

        {/* Press Mentions */}
        <div className="mb-16">
          <p className="text-center text-gray-500 font-semibold mb-8">AS FEATURED IN</p>
          <div className="flex items-center justify-center gap-12 opacity-60 hover:opacity-80 transition-opacity">
            <div className="text-2xl font-bold text-gray-700">BBC</div>
            <div className="text-2xl font-bold text-gray-700">The Guardian</div>
            <div className="text-2xl font-bold text-gray-700">Telegraph</div>
            <div className="text-2xl font-bold text-gray-700">Which?</div>
            <div className="text-2xl font-bold text-gray-700">Trustpilot</div>
          </div>
        </div>

        {/* Trust Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* Happy Customers */}
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl border border-green-200">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black text-green-700 mb-2">50,000+</div>
            <div className="text-lg font-semibold text-green-800 mb-2">Happy Customers</div>
            <div className="text-sm text-green-600">Satisfied homeowners across the UK</div>
          </div>

          {/* Verified Professionals */}
          <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl border border-blue-200">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black text-blue-700 mb-2">10,000+</div>
            <div className="text-lg font-semibold text-blue-800 mb-2">Verified Professionals</div>
            <div className="text-sm text-blue-600">ID checked & background verified</div>
          </div>

          {/* Insurance Protection */}
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl border border-purple-200">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <div className="text-4xl font-black text-purple-700 mb-2">£2M+</div>
            <div className="text-lg font-semibold text-purple-800 mb-2">Insurance Protection</div>
            <div className="text-sm text-purple-600">Full liability coverage guaranteed</div>
          </div>
        </div>

        {/* Review Badge */}
        <div className="text-center">
          <div className="inline-flex items-center gap-4 bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Star className="w-8 h-8 text-yellow-500 fill-current" />
              <div>
                <div className="text-3xl font-black text-gray-900">4.9/5</div>
                <div className="text-sm text-gray-600">Trustpilot Rating</div>
              </div>
            </div>
            <div className="w-px h-12 bg-yellow-300"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div>
                <div className="text-3xl font-black text-gray-900">98%</div>
                <div className="text-sm text-gray-600">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AuthorityTrustSection;
