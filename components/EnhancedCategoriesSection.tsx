import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Bolt,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  Leaf,
  Layout,
  Key,
  Shield,
  Star,
  Clock,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Category {
  name: string;
  jobs: number;
  icon: React.ElementType;
  responseTime: string;
  availability: string;
  demand: 'high' | 'medium' | 'low';
  averagePrice: string;
  description: string;
}

const categories: Category[] = [
  {
    name: 'Electrician',
    jobs: 1247,
    icon: Bolt,
    responseTime: '5 min',
    availability: 'Available now',
    demand: 'high',
    averagePrice: '£150-300',
    description: 'Electrical repairs, installations & safety checks'
  },
  {
    name: 'Plumber',
    jobs: 1156,
    icon: Wrench,
    responseTime: '8 min',
    availability: 'Same day',
    demand: 'high',
    averagePrice: '£120-250',
    description: 'Emergency repairs, installations & maintenance'
  },
  {
    name: 'Builder',
    jobs: 892,
    icon: Hammer,
    responseTime: '12 min',
    availability: 'This week',
    demand: 'medium',
    averagePrice: '£300-800',
    description: 'Extensions, renovations & construction work'
  },
  {
    name: 'Painter',
    jobs: 743,
    icon: Paintbrush,
    responseTime: '15 min',
    availability: 'Next week',
    demand: 'medium',
    averagePrice: '£200-400',
    description: 'Interior & exterior painting services'
  },
  {
    name: 'Roofer',
    jobs: 567,
    icon: HomeIcon,
    responseTime: '10 min',
    availability: 'Available now',
    demand: 'high',
    averagePrice: '£250-600',
    description: 'Roof repairs, maintenance & installations'
  },
  {
    name: 'Gardener',
    jobs: 834,
    icon: Leaf,
    responseTime: '20 min',
    availability: 'This week',
    demand: 'low',
    averagePrice: '£80-200',
    description: 'Garden maintenance & landscaping services'
  },
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case 'high': return 'bg-red-100 text-red-700 border-red-200';
    case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    case 'low': return 'bg-green-100 text-green-700 border-green-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getDemandText = (demand: string) => {
  switch (demand) {
    case 'high': return 'High Demand';
    case 'medium': return 'Popular';
    case 'low': return 'Available';
    default: return 'Available';
  }
};

export default function EnhancedCategoriesSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <TrendingUp className="w-4 h-4" />
            Most Requested Services
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Find Your Perfect Tradesperson
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connect with verified, insured professionals in your area. Get instant quotes and book with confidence.
          </p>
        </div>

        {/* Trust Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">10,000+</div>
            <div className="text-sm text-gray-600">Verified Trades</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">£2M+</div>
            <div className="text-sm text-gray-600">Insurance Cover</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">4.9/5</div>
            <div className="text-sm text-gray-600">Customer Rating</div>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <Users className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-gray-900">50,000+</div>
            <div className="text-sm text-gray-600">Happy Customers</div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Link
                key={category.name}
                href={`/find-tradespeople?trade=${encodeURIComponent(category.name.toLowerCase())}`}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-6 h-full hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {category.name}
                        </h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <Badge className={`${getDemandColor(category.demand)} border font-semibold`}>
                      {getDemandText(category.demand)}
                    </Badge>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-700">
                        <span className="font-semibold">{category.responseTime}</span> response
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700 font-semibold">{category.availability}</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Typical cost</div>
                        <div className="text-lg font-bold text-gray-900">{category.averagePrice}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-600">{category.jobs}+ jobs</div>
                        <div className="text-xs text-blue-600 font-semibold">this month</div>
                      </div>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-[1.02]">
                    Get Free Quote
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h3>
          <p className="text-blue-100 mb-6">Browse all our verified tradespeople or describe your specific job requirements</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild
              className="bg-white text-blue-700 hover:bg-gray-100 font-bold px-8 py-3 rounded-xl"
            >
              <Link href="/find-tradespeople">Browse All Trades</Link>
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700 font-bold px-8 py-3 rounded-xl"
            >
              Post Your Job
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
