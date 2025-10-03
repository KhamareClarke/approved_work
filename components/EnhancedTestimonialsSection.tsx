import React from 'react';
import { Star, MapPin, CheckCircle, Quote, Shield, Clock } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  review: string;
  jobType: string;
  tradesPerson: string;
  completedDate: string;
  jobValue: string;
  verified: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Thompson',
    location: 'London',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    review: 'Fantastic service! Got 3 quotes within 10 minutes and the electrician was professional, punctual, and reasonably priced. The whole process was seamless from start to finish.',
    jobType: 'Electrical Repair',
    tradesPerson: 'Mike Johnson (Electrician)',
    completedDate: '2 days ago',
    jobValue: '£185',
    verified: true
  },
  {
    id: '2',
    name: 'James Wilson',
    location: 'Manchester',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    rating: 5,
    review: 'Emergency plumbing issue sorted same day! The platform made it so easy to find a reliable tradesperson. Great communication throughout and fair pricing.',
    jobType: 'Emergency Plumbing',
    tradesPerson: 'David Smith (Plumber)',
    completedDate: '1 week ago',
    jobValue: '£240',
    verified: true
  },
  {
    id: '3',
    name: 'Emma Davis',
    location: 'Birmingham',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    rating: 5,
    review: 'Brilliant experience from quote to completion. The roofer was highly skilled and the insurance guarantee gave me complete peace of mind. Highly recommended!',
    jobType: 'Roof Repair',
    tradesPerson: 'Tom Brown (Roofer)',
    completedDate: '3 days ago',
    jobValue: '£450',
    verified: true
  },
  {
    id: '4',
    name: 'Michael Chen',
    location: 'Leeds',
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg',
    rating: 5,
    review: 'Outstanding service! The painter arrived on time, worked efficiently, and left everything spotless. The quality exceeded my expectations.',
    jobType: 'Interior Painting',
    tradesPerson: 'Lisa Green (Painter)',
    completedDate: '5 days ago',
    jobValue: '£320',
    verified: true
  },
  {
    id: '5',
    name: 'Rebecca Martinez',
    location: 'Bristol',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    rating: 5,
    review: 'Perfect garden transformation! The landscaper was creative, professional, and delivered exactly what we discussed. Great value for money.',
    jobType: 'Garden Landscaping',
    tradesPerson: 'Paul Wilson (Gardener)',
    completedDate: '1 week ago',
    jobValue: '£680',
    verified: true
  },
  {
    id: '6',
    name: 'Daniel Kumar',
    location: 'Liverpool',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    rating: 5,
    review: 'Excellent builder who completed our extension on time and within budget. Great communication and attention to detail throughout the project.',
    jobType: 'Home Extension',
    tradesPerson: 'Steve Roberts (Builder)',
    completedDate: '2 weeks ago',
    jobValue: '£2,400',
    verified: true
  }
];

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${
            i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default function EnhancedTestimonialsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <CheckCircle className="w-4 h-4" />
            Verified Customer Reviews
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real reviews from real customers who found their perfect tradesperson through MyApproved
          </p>
        </div>

        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-8 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-3xl font-bold text-gray-900">4.9</div>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50,000+</div>
              <div className="text-sm text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">98%</div>
              <div className="text-sm text-gray-600">Would Recommend</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 mb-2">5 min</div>
              <div className="text-sm text-gray-600">Average Response</div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Quote Icon */}
              <div className="flex justify-between items-start mb-4">
                <Quote className="w-8 h-8 text-blue-200" />
                {testimonial.verified && (
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <StarRating rating={testimonial.rating} />
                <span className="text-sm text-gray-600">({testimonial.rating}.0)</span>
              </div>

              {/* Review Text */}
              <p className="text-gray-700 mb-4 leading-relaxed">
                "{testimonial.review}"
              </p>

              {/* Job Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Job Type:</span>
                  <span className="font-semibold text-gray-900">{testimonial.jobType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Tradesperson:</span>
                  <span className="font-semibold text-gray-900">{testimonial.tradesPerson}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Job Value:</span>
                  <span className="font-bold text-green-600">{testimonial.jobValue}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {testimonial.completedDate}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Guarantee */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-3xl p-8 text-white text-center">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-8 h-8" />
              <h3 className="text-2xl font-bold">MyApproved Guarantee</h3>
            </div>
            <p className="text-blue-100 text-lg mb-6">
              Every job is protected by our £2M insurance guarantee. If you're not completely satisfied, 
              we'll make it right or your money back.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <CheckCircle className="w-8 h-8 text-green-400 mb-2" />
                <div className="font-semibold">Verified Tradespeople</div>
                <div className="text-sm text-blue-200">ID checked & qualified</div>
              </div>
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-green-400 mb-2" />
                <div className="font-semibold">Fully Insured</div>
                <div className="text-sm text-blue-200">£2M+ protection</div>
              </div>
              <div className="flex flex-col items-center">
                <Star className="w-8 h-8 text-yellow-400 mb-2" />
                <div className="font-semibold">Quality Guaranteed</div>
                <div className="text-sm text-blue-200">Money-back promise</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
