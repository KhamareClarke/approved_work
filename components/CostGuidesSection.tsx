import React from 'react';
import { BookOpen, Calculator, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const CostGuidesSection = () => {
  const guides = [
    {
      title: "Plumber Costs 2025",
      description: "Complete guide to plumbing costs, from emergency callouts to full bathroom installations.",
      readTime: "5 min read",
      category: "Plumbing",
      href: "/guides/plumber-costs-2025",
      icon: Calculator,
      color: "blue"
    },
    {
      title: "How to Choose a Roofer",
      description: "Expert tips on selecting the right roofing contractor and avoiding costly mistakes.",
      readTime: "7 min read", 
      category: "Roofing",
      href: "/guides/how-to-choose-roofer",
      icon: BookOpen,
      color: "green"
    },
    {
      title: "Electrician Rates & Pricing",
      description: "Understanding electrical work costs and what to expect when hiring an electrician.",
      readTime: "4 min read",
      category: "Electrical", 
      href: "/guides/electrician-rates-pricing",
      icon: TrendingUp,
      color: "yellow"
    },
    {
      title: "Builder Costs Guide 2025",
      description: "From extensions to renovations - complete breakdown of building project costs.",
      readTime: "8 min read",
      category: "Building",
      href: "/guides/builder-costs-guide-2025", 
      icon: Calculator,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        border: "border-blue-200", 
        icon: "bg-blue-500",
        text: "text-blue-700",
        hover: "hover:border-blue-300"
      },
      green: {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-500", 
        text: "text-green-700",
        hover: "hover:border-green-300"
      },
      yellow: {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: "bg-yellow-500",
        text: "text-yellow-700", 
        hover: "hover:border-yellow-300"
      },
      purple: {
        bg: "bg-purple-50",
        border: "border-purple-200",
        icon: "bg-purple-500",
        text: "text-purple-700",
        hover: "hover:border-purple-300"
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-gray-900 mb-6 leading-tight">
            Cost Guides & Tips
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice and transparent pricing to help you make informed decisions
          </p>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {guides.map((guide, index) => {
            const colors = getColorClasses(guide.color);
            const IconComponent = guide.icon;
            
            return (
              <Link
                key={index}
                href={guide.href}
                className="group"
              >
                <article className={`h-full p-6 rounded-2xl border-2 ${colors.bg} ${colors.border} ${colors.hover} transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
                  
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className={`text-xs font-semibold ${colors.text} bg-white px-2 py-1 rounded-full`}>
                      {guide.category}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-700 transition-colors">
                    {guide.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {guide.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{guide.readTime}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            href="/guides"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <BookOpen className="w-5 h-5" />
            <span>View All Guides</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CostGuidesSection;
