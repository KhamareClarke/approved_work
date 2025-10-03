 "use client";

import { useState, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  Search,
  MapPin,
  Star,
  Shield,
  UsersRound,
  TrendingUp,
  ChevronRight,
  Phone,
  Mail,
  ChevronLeft,
  Smartphone,
  Download,
  Bell,
  Calculator,
  Clock,
  Upload,
  X,
  User,
  Wrench,
  ChevronDown,
  CheckCircle,
  ShieldCheck,
  CircleDollarSign,
  Bolt,
  Hammer,
  Paintbrush,
  Home as HomeIcon,
  Leaf,
  Layout,
  Key,
  Sparkles,
  Layers,
  Square,
  Utensils,
  ShowerHead,
  Wind,
  Bug,
  Monitor,
  Thermometer,
  Brush,
  Fence,
  Droplets,
  Snowflake,
  Award,
  Users
} from "lucide-react";
import "./recommended-scrollbar.css";
import SmartSearchBar from "../components/SmartSearchBar";
import TabsSection from "../components/TabsSection";
import TrendingCategoriesSection from "../components/TrendingCategoriesSection";
import AuthorityTrustSection from "../components/AuthorityTrustSection";
import CostGuidesSection from "../components/CostGuidesSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import InitialsAvatar from "@/components/InitialsAvatar";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import CookieConsent from "@/components/CookieConsent";
import FloatingAssistant from "@/components/FloatingAssistant";

 // Map trade to icon for Select menu (visual only)
 const tradeIconFor = (name: string) => {
   const n = name.toLowerCase();
   if (n.includes('plumb')) return <Droplets className="w-4 h-4 text-blue-600" />;
   if (n.includes('electric')) return <Bolt className="w-4 h-4 text-yellow-600" />;
   if (n.includes('builder')) return <Hammer className="w-4 h-4 text-gray-700" />;
   if (n.includes('paint')) return <Paintbrush className="w-4 h-4 text-rose-600" />;
   if (n.includes('roof')) return <HomeIcon className="w-4 h-4 text-amber-700" />;
   if (n.includes('garden')) return <Leaf className="w-4 h-4 text-green-700" />;
   if (n.includes('tiler') || n.includes('tile')) return <Layout className="w-4 h-4 text-slate-700" />;
   if (n.includes('carpenter')) return <Wrench className="w-4 h-4 text-amber-700" />;
   if (n.includes('lock')) return <Key className="w-4 h-4 text-slate-700" />;
   if (n.includes('clean')) return <Brush className="w-4 h-4 text-cyan-700" />;
   if (n.includes('fence')) return <Fence className="w-4 h-4 text-emerald-700" />;
   if (n.includes('hvac') || n.includes('air')) return <Wind className="w-4 h-4 text-sky-700" />;
   if (n.includes('bathroom')) return <ShowerHead className="w-4 h-4 text-sky-700" />;
   if (n.includes('kitchen')) return <Utensils className="w-4 h-4 text-amber-700" />;
   if (n.includes('appliance')) return <Monitor className="w-4 h-4 text-slate-700" />;
   if (n.includes('pest')) return <Bug className="w-4 h-4 text-rose-700" />;
   if (n.includes('insulation')) return <Thermometer className="w-4 h-4 text-orange-700" />;
   if (n.includes('gutter')) return <Droplets className="w-4 h-4 text-blue-600" />;
   return <Wrench className="w-4 h-4 text-slate-700" />;
 };

const tradeCategories = [
  { name: "Plumber", icon: "P", jobs: 1247 },
  { name: "Electrician", icon: "E", jobs: 892 },
  { name: "Builder", icon: "B", jobs: 1156 },
  { name: "Painter", icon: "P", jobs: 743 },
  { name: "Roofer", icon: "R", jobs: 567 },
  { name: "Gardener", icon: "G", jobs: 834 },
  { name: "Tiler", icon: "T", jobs: 445 },
  { name: "Carpenter", icon: "C", jobs: 678 },
  { name: "Locksmith", icon: "L", jobs: 324 },
  { name: "Cleaner", icon: "C", jobs: 956 },
  { name: "Handyman", icon: "H", jobs: 1089 },
  { name: "Plasterer", icon: "P", jobs: 387 },
  { name: "Flooring", icon: "F", jobs: 523 },
  { name: "Kitchen Fitter", icon: "K", jobs: 298 },
  { name: "Bathroom Fitter", icon: "B", jobs: 412 },
  { name: "Window Cleaner", icon: "W", jobs: 634 },
  { name: "Pest Control", icon: "P", jobs: 189 },
  { name: "Appliance Repair", icon: "A", jobs: 267 },
  { name: "HVAC", icon: "H", jobs: 345 },
  { name: "Decorator", icon: "D", jobs: 456 },
  { name: "Driveway", icon: "D", jobs: 234 },
  { name: "Fencing", icon: "F", jobs: 378 },
  { name: "Guttering", icon: "G", jobs: 289 },
  { name: "Insulation", icon: "I", jobs: 156 },
];

type FeaturedTP = {
  id: string;
  name: string;
  trade: string;
  rating: number;
  reviews: number;
  location: string;
  image: string | null;
  verified: boolean;
  yearsExperience: number;
};
// Will be populated from API
// const initialFeatured: FeaturedTP[] = [];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    trade: "",
    description: "",
    postcode: "",
    urgency: "",
    availability: "",
    images: [] as File[],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [estimate, setEstimate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [featured, setFeatured] = useState<FeaturedTP[]>([]);
  // Embla for Recommended Jobs (ensures full cards per view)
  const [recEmblaRef, recEmblaApi] = useEmblaCarousel({ loop: false, align: 'start', containScroll: 'trimSnaps' });
  // Testimonials carousel state
  const [testimonialsSlide, setTestimonialsSlide] = useState(0);
  // Embla carousel for Most Popular Services
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      try { emblaApi.scrollNext(); } catch {}
    }, 3500);
    return () => clearInterval(interval);
  }, [emblaApi]);
  // Testimonials data and auto-rotate
  const testimonials = [
    {
      name: 'Sarah Thompson',
      city: 'London',
      quote:
        'I had an electrical fault late evening and got matched within minutes. The electrician arrived the next morning and fixed it quickly. The whole process felt safe and transparent.',
      image: 'https://randomuser.me/api/portraits/women/68.jpg',
    },
    {
      name: 'Imran Khan',
      city: 'Manchester',
      quote:
        'Instant quotes saved me so much time. I compared two options, read reviews, and booked in the same hour. The pro turned up on time and the work was spotless.',
      image: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
    {
      name: 'Rebecca Lewis',
      city: 'Birmingham',
      quote:
        'The verified and insured badges gave me confidence. I chose a roofer with great ratings and the price matched the estimate. Would definitely use again.',
      image: 'https://randomuser.me/api/portraits/women/17.jpg',
    },
    {
      name: 'Daniel Murphy',
      city: 'Leeds',
      quote:
        'Super easy to use. I uploaded a couple of photos and got realistic estimates. The tradesman was friendly, tidy, and finished faster than expected.',
      image: 'https://randomuser.me/api/portraits/men/33.jpg',
    },
    {
      name: 'James Patel',
      city: 'Liverpool',
      quote:
        'Booked a plumber in minutes and the communication was brilliant. No hidden costs and the workmanship was excellent. Highly recommend.',
      image: 'https://randomuser.me/api/portraits/men/76.jpg',
    },
    {
      name: 'Priya Singh',
      city: 'Nottingham',
      quote:
        'The insurance guarantee gave me peace of mind. I loved being able to compare profiles and see genuine reviews before confirming.',
      image: 'https://randomuser.me/api/portraits/women/25.jpg',
    },
    {
      name: 'Oliver Wright',
      city: 'Bristol',
      quote:
        'Fast responses and fair pricing. I appreciated the clear timelines and follow-up. Great experience from start to finish.',
      image: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: 'Amelia Clark',
      city: 'Edinburgh',
      quote:
        'I found an experienced decorator who matched my budget. The work was spotless and on schedule. I’ll be back for future projects.',
      image: 'https://randomuser.me/api/portraits/women/49.jpg',
    },
  ];
  const testimonialsPerSlide = 3;
  const testimonialSlides = Math.ceil(testimonials.length / testimonialsPerSlide);
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialsSlide((i) => (i + 1) % testimonialSlides);
    }, 4500);
    return () => clearInterval(id);
  }, [testimonialSlides]);
  // Rotating hero search messages
  const typingPhrases = [
    "Electrician in Manchester...",
    "Plumber in London...",
    "Roofer in Birmingham...",
  ];
  const [typed, setTyped] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = typingPhrases[phraseIndex];
    const speed = deleting ? 60 : 100;
    const id = setTimeout(() => {
      if (!deleting) {
        const next = current.slice(0, charIndex + 1);
        setTyped(next);
        setCharIndex(charIndex + 1);
        if (next === current) setDeleting(true);
      } else {
        const next = current.slice(0, Math.max(0, charIndex - 1));
        setTyped(next);
        setCharIndex(Math.max(0, charIndex - 1));
        if (next.length === 0) {
          setDeleting(false);
          setPhraseIndex((phraseIndex + 1) % typingPhrases.length);
        }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [charIndex, deleting, phraseIndex, typingPhrases]);

  const itemsPerSlide = 8;
  const totalSlides = Math.ceil(tradeCategories.length / itemsPerSlide);

  const trades = [
    "Plumber",
    "Electrician",
    "Builder",
    "Painter",
    "Roofer",
    "Gardener",
    "Tiler",
    "Carpenter",
    "Locksmith",
    "Cleaner",
    "Handyman",
    "Plasterer",
    "Flooring",
    "Kitchen Fitter",
    "Bathroom Fitter",
    "Window Cleaner",
    "Pest Control",
    "Appliance Repair",
    "HVAC",
    "Decorator",
    "Driveway",
    "Fencing",
    "Guttering",
    "Insulation",
    "Other",
  ];

  const urgencyOptions = [
    { value: "emergency", label: "Emergency (Same day)", icon: "!" },
    { value: "urgent", label: "Urgent (Within 24 hours)", icon: "!" },
    { value: "normal", label: "Normal (Within a week)", icon: "•" },
    { value: "flexible", label: "Flexible (No rush)", icon: "~" },
  ];

  const steps = [
    { number: 1, title: "Select Trade", icon: "1" },
    { number: 2, title: "Describe Job", icon: "2" },
    { number: 3, title: "Location & Timing", icon: "3" },
    { number: 4, title: "Get Estimate", icon: "4" },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides, isAutoPlaying]);

  // Load featured tradespeople from API (top 3)
  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await fetch(
          "/api/tradespeopleeeee/list?page=1&limit=3&sortBy=rating",
          { cache: "no-store" } as RequestInit
        );
        const data = await res.json();
        if (data.success) {
          const mapped: FeaturedTP[] = (data.tradespeople || []).map(
            (p: any) => ({
              id: p.id,
              name: p.name,
              trade: p.trade,
              rating: p.rating,
              reviews: p.reviews,
              location: (p.location || "").toString().split(",")[0] || "",
              image: p.image || null,
              verified: p.verified || false,
              yearsExperience: p.yearsExperience || 0,
            })
          );
          setFeatured(mapped);
        }
      } catch {}
    };
    loadFeatured();
  }, []);


  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
  };

  const getCurrentSlideItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return tradeCategories.slice(startIndex, startIndex + itemsPerSlide);
  };

  const handleInputChange = (field: string, value: string | File[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateEstimate = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Base pricing by trade and urgency
      const basePricing = {
        plumber: {
          emergency: { min: 200, max: 350 },
          urgent: { min: 150, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        electrician: {
          emergency: { min: 300, max: 500 },
          urgent: { min: 200, max: 350 },
          normal: { min: 150, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        builder: {
          emergency: { min: 500, max: 1000 },
          urgent: { min: 400, max: 800 },
          normal: { min: 300, max: 600 },
          flexible: { min: 200, max: 400 },
        },
        painter: {
          emergency: { min: 250, max: 400 },
          urgent: { min: 200, max: 300 },
          normal: { min: 150, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        roofer: {
          emergency: { min: 400, max: 700 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        carpenter: {
          emergency: { min: 300, max: 500 },
          urgent: { min: 250, max: 400 },
          normal: { min: 200, max: 300 },
          flexible: { min: 150, max: 250 },
        },
        tiler: {
          emergency: { min: 350, max: 600 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        handyman: {
          emergency: { min: 150, max: 300 },
          urgent: { min: 120, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        cleaner: {
          emergency: { min: 100, max: 200 },
          urgent: { min: 80, max: 150 },
          normal: { min: 60, max: 120 },
          flexible: { min: 50, max: 100 },
        },
        locksmith: {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        gardener: {
          emergency: { min: 120, max: 250 },
          urgent: { min: 100, max: 200 },
          normal: { min: 80, max: 150 },
          flexible: { min: 60, max: 120 },
        },
        plasterer: {
          emergency: { min: 250, max: 450 },
          urgent: { min: 200, max: 350 },
          normal: { min: 150, max: 250 },
          flexible: { min: 120, max: 200 },
        },
        flooring: {
          emergency: { min: 300, max: 600 },
          urgent: { min: 250, max: 500 },
          normal: { min: 200, max: 400 },
          flexible: { min: 150, max: 300 },
        },
        "kitchen fitter": {
          emergency: { min: 800, max: 1500 },
          urgent: { min: 600, max: 1200 },
          normal: { min: 500, max: 1000 },
          flexible: { min: 400, max: 800 },
        },
        "bathroom fitter": {
          emergency: { min: 600, max: 1200 },
          urgent: { min: 500, max: 1000 },
          normal: { min: 400, max: 800 },
          flexible: { min: 300, max: 600 },
        },
        "window cleaner": {
          emergency: { min: 80, max: 150 },
          urgent: { min: 60, max: 120 },
          normal: { min: 50, max: 100 },
          flexible: { min: 40, max: 80 },
        },
        "pest control": {
          emergency: { min: 150, max: 300 },
          urgent: { min: 120, max: 250 },
          normal: { min: 100, max: 200 },
          flexible: { min: 80, max: 150 },
        },
        "appliance repair": {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 120, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        hvac: {
          emergency: { min: 400, max: 700 },
          urgent: { min: 300, max: 500 },
          normal: { min: 250, max: 400 },
          flexible: { min: 200, max: 350 },
        },
        decorator: {
          emergency: { min: 200, max: 350 },
          urgent: { min: 150, max: 250 },
          normal: { min: 120, max: 200 },
          flexible: { min: 100, max: 180 },
        },
        driveway: {
          emergency: { min: 500, max: 1000 },
          urgent: { min: 400, max: 800 },
          normal: { min: 300, max: 600 },
          flexible: { min: 250, max: 500 },
        },
        fencing: {
          emergency: { min: 300, max: 600 },
          urgent: { min: 250, max: 500 },
          normal: { min: 200, max: 400 },
          flexible: { min: 150, max: 300 },
        },
        guttering: {
          emergency: { min: 200, max: 400 },
          urgent: { min: 150, max: 300 },
          normal: { min: 120, max: 250 },
          flexible: { min: 100, max: 200 },
        },
        insulation: {
          emergency: { min: 400, max: 800 },
          urgent: { min: 300, max: 600 },
          normal: { min: 250, max: 500 },
          flexible: { min: 200, max: 400 },
        },
      };

      // Location multipliers (based on UK regions)
      const locationMultipliers = {
        london: 1.4,
        manchester: 1.2,
        birmingham: 1.1,
        leeds: 1.1,
        liverpool: 1.0,
        sheffield: 1.0,
        edinburgh: 1.2,
        glasgow: 1.1,
        bristol: 1.2,
        cardiff: 1.1,
        newcastle: 1.0,
        belfast: 1.0,
        default: 1.0,
      };

      const tradeKey = formData.trade.toLowerCase();
      const urgencyKey = formData.urgency as keyof typeof basePricing.plumber;

      // Get base pricing for the trade and urgency
      const basePrice =
        basePricing[tradeKey as keyof typeof basePricing]?.[urgencyKey] ||
        basePricing.handyman[urgencyKey];

      // Determine location multiplier
      const postcode = formData.postcode.toLowerCase();
      let locationMultiplier = locationMultipliers.default;

      // Check for major cities in postcode
      for (const [city, multiplier] of Object.entries(locationMultipliers)) {
        if (postcode.includes(city)) {
          locationMultiplier = multiplier;
          break;
        }
      }

      // Apply location multiplier
      const adjustedMin = Math.round(basePrice.min * locationMultiplier);
      const adjustedMax = Math.round(basePrice.max * locationMultiplier);

      // Add some randomness to make it feel more realistic
      const randomVariation = 0.9 + Math.random() * 0.2; // ±10% variation
      const finalMin = Math.round(adjustedMin * randomVariation);
      const finalMax = Math.round(adjustedMax * randomVariation);

      const estimate = `£${finalMin}-${finalMax}`;
      setEstimate(estimate);
    } catch (error) {
      console.error("Error generating estimate:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const submitJob = async () => {
    // Simply redirect to login
    window.location.href = '/login/client';
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div className="text-center mb-8 md:mb-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                What <span className="text-[#fdbd18]">service</span> do you need?
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                Select the type of <span className="text-[#fdbd18] font-semibold">trade</span> you are looking for
              </p>
              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="w-4 h-4" /> AI will tailor questions for faster, accurate quotes
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent my-2 md:my-3" />

            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-[2px] border border-blue-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-4">
                Trade Category <span className="text-red-500">*</span>
              </label>
              <Select
                value={formData.trade}
                onValueChange={(value) => handleInputChange("trade", value)}
              >
                <SelectTrigger className="w-full h-14 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-shadow shadow-sm hover:shadow">
                  <SelectValue placeholder="e.g. Plumber, Electrician, Builder" />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {tradeCategories.map((option) => (
                    <SelectItem key={option.name} value={option.name.toLowerCase()}>
                      <div className="flex items-center gap-2">
                        {tradeIconFor(option.name)}
                        <span>{option.name}</span>
                        <span className="ml-auto text-[11px] text-slate-500">{option.jobs} jobs</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800"><ShieldCheck className="w-3.5 h-3.5" /> Verified pros</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-yellow-200 bg-yellow-50 px-2.5 py-1 text-yellow-800"><Star className="w-3.5 h-3.5" /> Top rated</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-green-800"><Clock className="w-3.5 h-3.5" /> Under 60s</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800"><Shield className="w-3.5 h-3.5" /> Fully insured</span>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6 md:mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                Tell us about your <span className="text-[#fdbd18]">job</span>
              </h3>
              <p className="text-gray-600 text-base md:text-lg">
                A few details help us get you an <span className="text-[#fdbd18] font-semibold">accurate</span> quote
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="w-3.5 h-3.5" /> AI highlights what pros need to know
              </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white/70 backdrop-blur-[2px] border border-blue-100 rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Describe the work <span className="text-red-500">*</span>
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="E.g. Leak under kitchen sink, steady drip when tap runs…"
                    className="min-h-[120px] text-base bg-white border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-xl"
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    Tip: mention size, access, materials, and any photos
                  </p>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                    Urgency <span className="text-red-500">*</span>
                  </label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value) => handleInputChange("urgency", value)}
                  >
                    <SelectTrigger className="w-full h-12 rounded-xl border border-blue-200 bg-white/90 focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-shadow shadow-sm hover:shadow">
                      <SelectValue placeholder="How urgent is it? (e.g. Emergency, Urgent, Normal)" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((u) => (
                        <SelectItem key={u.value} value={u.value}>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-blue-700" />
                            <span>{u.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm md:text-base font-semibold text-gray-700 mb-3">
                    Add photos (optional)
                  </label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="h-11 rounded-xl bg-blue-700 hover:bg-blue-800 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" /> Upload images
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <span className="text-xs text-gray-500">JPG or PNG up to 10MB each</span>
                  </div>

                  {formData.images?.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {formData.images.map((file, idx) => (
                        <div key={idx} className="relative group">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`upload-${idx}`}
                            className="h-24 w-full object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute -top-2 -right-2 bg-white/95 border border-gray-200 rounded-full p-1 shadow hover:shadow-md"
                            aria-label="Remove image"
                          >
                            <X className="w-3.5 h-3.5 text-gray-700" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-blue-800"><ShieldCheck className="w-3.5 h-3.5" /> Verified pros</span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-amber-800"><Shield className="w-3.5 h-3.5" /> Fully insured</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Location & Availability
              </h3>
              <p className="text-gray-600">
                Where and when do you need the work done?
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                <MapPin className="w-3.5 h-3.5" /> AI suggests nearby verified pros based on your area
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Where? <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  value={formData.postcode}
                  onChange={(e) =>
                    handleInputChange("postcode", e.target.value.toUpperCase())
                  }
                  placeholder="Enter your postcode or town"
                  className="pl-10 h-12 text-base text-gray-900 bg-white border-gray-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Availability
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Morning", "Afternoon", "Evening", "Flexible"].map((time) => (
                  <Button
                    key={time}
                    variant={
                      formData.availability === time ? "default" : "outline"
                    }
                    onClick={() => handleInputChange("availability", time)}
                    className={`h-14 text-sm md:text-base font-medium transition-all duration-200 ${
                      formData.availability === time
                        ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg"
                        : "bg-white text-gray-900 border-2 border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Your AI Estimate
              </h3>
              <p className="text-gray-600">
                Based on your job details and location
              </p>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                <p className="text-gray-600">Generating your estimate...</p>
              </div>
            ) : estimate ? (
              <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 shadow-xl">
                <CardContent className="p-8 md:p-10 text-center">
                  <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                    {estimate}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg">
                    Estimated cost for your {formData.trade.toLowerCase()} job
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base text-gray-700 bg-white/50 rounded-lg p-4 mb-6">
                    <div>
                      <strong>Trade:</strong> {formData.trade}
                    </div>
                    <div>
                      <strong>Location:</strong> {formData.postcode}
                    </div>
                    <div>
                      <strong>Urgency:</strong>{" "}
                      {
                        urgencyOptions.find((u) => u.value === formData.urgency)
                          ?.label
                      }
                    </div>
                    <div>
                      <strong>Availability:</strong>{" "}
                      {formData.availability || "Flexible"}
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800 font-medium">
                      ⚠️ This is an AI-generated quote. Your selected tradesman
                      may quote differently.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center">
                <Button
                  onClick={generateEstimate}
                  className="bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-medium py-4 px-8 rounded-lg font-semibold"
                >
                  Generate Estimate
                </Button>
              </div>
            )}

            {estimate && (
              <div className="text-center space-y-4">
                <div className="space-y-3">
                  <Button
                    onClick={submitJob}
                    className="bg-green-600 hover:bg-green-700 text-white text-sm sm:text-base md:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-lg w-full font-semibold"
                  >
                    Submit Job for Approval
                  </Button>
                  
                <Button
                  asChild
                    variant="outline"
                    className="bg-blue-700 hover:bg-blue-800 text-white text-sm sm:text-base md:text-lg font-medium py-3 sm:py-4 px-4 sm:px-6 md:px-8 rounded-lg w-full font-semibold"
                >
                  <Link href="/find-tradespeople">
                      Browse Tradespeople Instead
                  </Link>
                </Button>
                </div>
                
                {submitResult && (
                  <div className={`p-4 rounded-lg ${
                    submitResult.success 
                      ? 'bg-green-50 border border-green-200 text-green-800' 
                      : 'bg-red-50 border border-red-200 text-red-800'
                  }`}>
                    <p className="font-semibold">{submitResult.message}</p>
                    {submitResult.data?.jobId && (
                      <p className="text-sm mt-1">Job ID: {submitResult.data.jobId}</p>
                    )}
                  </div>
                )}
                
                <p className="text-sm text-gray-700">
                  Submit your job for admin approval, or browse available tradespeople
                </p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  // Add Font Awesome CSS for icons (client-only, in effect to avoid hydration issues)
  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css";
    link.rel = "stylesheet";
    link.crossOrigin = "anonymous";
    link.referrerPolicy = "no-referrer";
    document.head.appendChild(link);
    return () => {
      try {
        document.head.removeChild(link);
      } catch {}
    };
  }, []);

  return (
    <div suppressHydrationWarning>
      <CookieConsent />
      <FloatingAssistant mode="home" />
      {/* Gold Standard Professional Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 to-blue-800/95"></div>
        
        {/* Streamlined Trust Bar */}
        <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-center gap-12 text-sm font-semibold">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">✅ 10,000+ Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Star className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">⭐ 4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white">🛡️ £2M+ Insured</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative max-w-6xl mx-auto px-6 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Column - Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full px-5 py-2.5 text-sm font-semibold text-yellow-300">
                <Award className="w-4 h-4" />
                <span>🇬🇧 UK's #1 Trusted Tradesperson Platform</span>
              </div>

              {/* Headline */}
              <div>
                <h1 className="text-5xl lg:text-6xl font-black leading-tight mb-6">
                  <span className="block text-white">Hire Trusted Local</span>
                  <span className="block text-yellow-400 mt-1">Tradespeople</span>
                  <span className="block text-blue-100 text-4xl lg:text-5xl mt-2">Get Quotes in 60 Seconds</span>
                </h1>
                
                {/* Social Proof */}
                <div className="flex items-center gap-4 mt-6">
                  <div className="flex -space-x-2">
                    {['68', '12', '17', '33'].map((id, i) => (
                      <img
                        key={i}
                        src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${id}.jpg`}
                        alt=""
                        className="w-10 h-10 rounded-full border-2 border-white"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-blue-200 text-sm font-medium">💙 Trusted by 50,000+ happy homeowners</p>
                  </div>
                </div>
              </div>

              {/* Enhanced Subtitle with Reassuring Microcopy */}
              <div className="space-y-4">
                <p className="text-xl text-blue-100 leading-relaxed">
                  Connect with <span className="text-yellow-300 font-semibold">verified, insured professionals</span> in your area
                </p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <p className="text-blue-200 font-medium text-center">
                    ✅ No hidden fees • ✅ No cowboy builders • ✅ 100% free to use
                  </p>
                </div>
              </div>

              {/* Single Clear CTA - Conversion Optimized */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer group hover:shadow-3xl transition-all duration-300 border-4 border-orange-400/20 hover:border-orange-400/40">
                    <div className="text-center mb-6">
                      <h3 className="text-3xl font-black text-gray-900 mb-2">Get My Free Quote</h3>
                      <p className="text-gray-600 text-lg">Takes less than 60 seconds • No obligation</p>
                    </div>
                    
                    <div className="flex items-center bg-gray-50 rounded-xl p-6 group-hover:bg-orange-50 transition-colors mb-6 border-2 border-gray-200 group-hover:border-orange-200">
                      <Search className="w-6 h-6 text-gray-400 mr-4" />
                      <input
                        type="text"
                        placeholder={typed || typingPhrases[phraseIndex]}
                        className="flex-1 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium"
                        readOnly
                      />
                    </div>
                    
                    <Button className="w-full h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xl rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                      Get Free Quotes Now →
                    </Button>
                    
                    <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        100% Free
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-blue-500" />
                        Instant Matching
                      </span>
                      <span className="flex items-center gap-1">
                        <Shield className="w-4 h-4 text-purple-500" />
                        Fully Insured
                      </span>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="max-w-2xl w-full p-0 bg-white max-h-[90vh] overflow-y-auto">
                  <div className="p-4 sm:p-6 md:p-8 lg:p-10">
                    {/* 4-Step AI Quote Form (Stepper) */}
                    <div className="flex items-center justify-between mb-8 md:mb-10">
                      {steps.map((step, index) => (
                        <div key={step.number} className="flex items-center flex-1">
                          <div
                            className={`flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
                              currentStep >= step.number
                                ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg scale-110"
                                : "bg-gray-100 text-gray-500 border-2 border-gray-200"
                            }`}
                          >
                            {currentStep > step.number ? (
                              <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                            ) : (
                              step.number
                            )}
                          </div>
                          {index < steps.length - 1 && (
                            <div
                              className={`flex-1 h-1 mx-2 md:mx-4 rounded-full transition-all duration-300 ${
                                currentStep > step.number
                                  ? "bg-gradient-to-r from-blue-600 to-blue-700"
                                  : "bg-gray-200"
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="min-h-[350px] md:min-h-[400px]">{renderStep()}</div>
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8 md:mt-10">
                      <Button
                        variant="outline"
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="flex items-center justify-center bg-white text-gray-900 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 px-6 py-3 text-base font-medium"
                      >
                        <ChevronLeft className="w-4 h-4 mr-2" />
                        Previous
                      </Button>
                      {currentStep < 4 && (
                        <Button
                          onClick={nextStep}
                          disabled={
                            (currentStep === 1 && !formData.trade) ||
                            (currentStep === 2 && (!formData.description || !formData.urgency)) ||
                            (currentStep === 3 && !formData.postcode)
                          }
                          className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          Next
                        </Button>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Right Column - Clean Professional Image */}
            <div className="relative">
              <img
                src="/hero.png"
                alt="Professional Tradespeople"
                className="w-full h-[400px] rounded-xl shadow-2xl object-cover"
              />
              
              {/* Simple Overlay Stats */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-xl">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-gray-900">✅ 10k+</div>
                      <div className="text-xs text-gray-600 font-medium">ID Verified</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">⭐ 4.9</div>
                      <div className="text-xs text-gray-600 font-medium">Top Rated</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">🛡️ £2M+</div>
                      <div className="text-xs text-gray-600 font-medium">Protected</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SEO Enhancement - LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "MyApproved",
            "description": "UK's #1 trusted platform to hire verified local tradespeople. Get instant quotes from insured professionals in your area.",
            "url": "https://myapproved.co.uk",
            "telephone": "+44-800-123-4567",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "GB",
              "addressRegion": "England"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "50000",
              "bestRating": "5",
              "worstRating": "1"
            },
            "serviceArea": {
              "@type": "Country",
              "name": "United Kingdom"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Tradesperson Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Plumbing Services",
                    "description": "Professional plumbing services from verified tradespeople"
                  }
                },
                {
                  "@type": "Offer", 
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Electrical Services",
                    "description": "Certified electricians for all electrical work"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service", 
                    "name": "Building Services",
                    "description": "Qualified builders for construction and renovation"
                  }
                }
              ]
            }
          })
        }}
      />

      <TrendingCategoriesSection />

      {/* PREMIUM: Authority & Trust Section */}
      <AuthorityTrustSection />

      {/* PREMIUM: Cost Guides & Tips Section */}
      <CostGuidesSection />

      {/* Recommended Jobs (upgraded) */}
      <section className="py-14 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold mb-8 text-blue-900 tracking-tight drop-shadow">Recommended Jobs</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Electrician in London',
                desc: 'Available now — quotes in 2 minutes.',
                tag: 'Urgent',
                city: 'London',
                today: 5,
              },
              {
                title: 'Find a Plumber in Manchester',
                desc: 'Instant AI quotes — approved plumbers.',
                tag: 'Available',
                city: 'Manchester',
                today: 7,
              },
              {
                title: 'Chimney Sweep — Local & Trusted',
                desc: 'Book a local pro — quick, verified help.',
                tag: 'Local',
                city: 'Leeds',
                today: 3,
              },
              {
                title: 'Gutter Cleaning Clearance',
                desc: 'Fast quotes from verified pros.',
                tag: 'Available',
                city: 'Birmingham',
                today: 4,
              },
              {
                title: 'Roofer for Leak Repair',
                desc: 'Emergency callouts — insured tradespeople.',
                tag: 'Urgent',
                city: 'Liverpool',
                today: 6,
              },
              {
                title: 'Gardener for Lawn Care',
                desc: 'Same‑week availability, fair pricing.',
                tag: 'Local',
                city: 'Nottingham',
                today: 2,
              },
            ].map((job, i) => {
              const tagColor =
                job.tag === 'Urgent'
                  ? 'bg-red-100 text-red-700'
                  : job.tag === 'Available'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700';
              return (
                <div key={i} className="bg-white rounded-3xl shadow-xl border border-blue-100 flex flex-col p-6 h-full">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tagColor}`}>{job.tag}</span>
                    <span className="text-xs text-blue-800/80">{job.today}+ homeowners requested this today</span>
                  </div>
                  <h3 className="font-extrabold text-lg md:text-xl text-blue-900 mb-1 tracking-tight">{job.title}</h3>
                  <p className="text-sm md:text-base text-gray-700">{job.desc}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm text-blue-800">
                    <MapPin className="w-4 h-4 text-blue-600" /> {job.city} • Available now
                  </div>
                  <Button className="mt-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-blue-900 font-bold py-2.5 rounded-xl text-base shadow w-full transition-colors" asChild>
                    <a href="#" aria-label="Request my free quote for this job">Get My Free Quote</a>
                  </Button>
                </div>
              );
            })}
          </div>
          <div className="sticky bottom-4 mt-8 z-10">
            <div className="max-w-3xl mx-auto">
              <Button className="w-full h-12 bg-[#fdbd18] hover:brightness-95 text-blue-900 font-extrabold rounded-2xl shadow-lg hover:shadow-yellow-400/40" onClick={() => document.getElementById('ai-quote-trigger')?.click()}>
                Request My Free Quote →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof & Testimonials (Carousel) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#002FA7] tracking-tight">What Customers Say</h2>
            <p className="text-[#002FA7]/80">Real reviews from customers across the UK</p>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${testimonialsSlide * 100}%)` }}>
                {Array.from({ length: testimonialSlides }).map((_, slide) => (
                  <div key={slide} className="w-full flex-shrink-0">
                    <div className="grid gap-6 md:grid-cols-3">
                      {testimonials.slice(slide * testimonialsPerSlide, slide * testimonialsPerSlide + testimonialsPerSlide).map((t, idx) => (
                        <div key={idx} className="bg-white rounded-2xl border border-blue-100 shadow p-6">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center text-blue-900 font-bold">
                              {t.image ? (
                                <img src={t.image} alt={t.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                              ) : (
                                <InitialsAvatar initials={`${t.name.split(' ')[0][0]}${t.name.split(' ').slice(-1)[0][0]}`.toUpperCase()} size="md" />
                              )}
                            </div>
                            <div className="text-sm text-[#002FA7] font-semibold">{t.name}
                              <div className="text-xs text-[#002FA7]/80 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {t.city}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 mb-2 text-[#fdbd18]">
                            <Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" /><Star className="w-4 h-4" />
                          </div>
                          <p className="text-[#002FA7] text-sm md:text-base leading-relaxed">“{t.quote}”</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {Array.from({ length: testimonialSlides }).map((_, i) => (
                <button key={i} onClick={() => setTestimonialsSlide(i)} className={`w-3 h-3 rounded-full ${i===testimonialsSlide? 'bg-blue-700' : 'bg-gray-300 hover:bg-gray-400'}`} aria-label={`Go to slide ${i+1}`}></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      

      

      {/* Action Cards (above Popular Jobs / Find Tradespeople) */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {/* Hire a tradesperson */}
            <Link href="/find-tradespeople" className="group bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[280px] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-50/50">
              <img
                src="/background.jpg"
                alt="Hire a tradesperson"
                className="w-full h-40 object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div style=\'width:100%;height:160px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#9ca3af;\'>Image</div>'); }}
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-blue-900 mb-1">Hire a tradesperson</h3>
                <p className="text-blue-800/90 mb-4">Find your local pro and get quotes in minutes.</p>
                <span className="mt-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#fdbd18] text-blue-900 font-bold shadow transition-transform duration-150 group-hover:scale-[1.02] self-start pointer-events-none">Hire now</span>
              </div>
            </Link>

            {/* Tradesperson sign up */}
            <Link href="/register/tradesperson" className="group bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[280px] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-50/50">
              <img
                src="/hero.png"
                alt="Tradesperson sign up"
                className="w-full h-40 object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div style=\'width:100%;height:160px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#9ca3af;\'>Image</div>'); }}
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700">
                  <UsersRound className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-blue-900 mb-1">Tradesperson sign up</h3>
                <p className="text-blue-800/90 mb-4">Join 10,000+ approved tradespeople and grow your business.</p>
                <span className="mt-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#fdbd18] text-blue-900 font-bold shadow transition-transform duration-150 group-hover:scale-[1.02] self-start pointer-events-none">Join today</span>
              </div>
            </Link>

            {/* Request a quote (opens AI quote calculator) */}
            <div className="group bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full min-h-[280px] transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5">
              <img
                src="/background.jpg"
                alt="Request a quote"
                className="w-full h-40 object-cover"
                onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div style=\'width:100%;height:160px;background:#e5e7eb;display:flex;align-items:center;justify-content:center;color:#9ca3af;\'>Image</div>'); }}
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 text-blue-700">
                  <Calculator className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-blue-900 mb-1">Request a quote</h3>
                <p className="text-blue-800/90 mb-4">Tell us your job and we’ll match you instantly with 3 vetted tradespeople.</p>
                <button type="button" onClick={() => document.getElementById('ai-quote-trigger')?.click()} className="mt-auto inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#fdbd18] text-blue-900 font-bold shadow transition-transform duration-150 group-hover:scale-[1.02] self-start">Request a quote</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Jobs / Find Tradespeople / Find Out More Tabs Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          {/* Tabs */}
          <TabsSection />
        </div>
      </section>

      {/* SEO FAQ Section (Accordion, 4 items) */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-blue-900 tracking-tight">FAQs</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="faq-1">
              <AccordionTrigger className="text-blue-900 font-semibold">How do I know a tradesperson is approved?</AccordionTrigger>
              <AccordionContent className="text-blue-800">
                All tradespeople are identity‑checked and verified. Learn more in our guide:
                {' '}
                <Link href="/blog/how-we-verify-tradespeople" className="text-blue-700 underline hover:text-blue-900">How We Verify Tradespeople</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-2">
              <AccordionTrigger className="text-blue-900 font-semibold">Can I get instant quotes in my area?</AccordionTrigger>
              <AccordionContent className="text-blue-800">
                Yes — use our quote tool for instant estimates and availability near you. Read more:
                {' '}
                <Link href="/blog/instant-quotes-near-you" className="text-blue-700 underline hover:text-blue-900">How Instant Quotes Work</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-3">
              <AccordionTrigger className="text-blue-900 font-semibold">Are tradespeople insured?</AccordionTrigger>
              <AccordionContent className="text-blue-800">
                We check for valid public liability insurance to protect your job.
                {' '}
                <Link href="/blog/insured-tradespeople" className="text-blue-700 underline hover:text-blue-900">Why Hiring an Insured Tradesperson Matters</Link>.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="faq-4">
              <AccordionTrigger className="text-blue-900 font-semibold">How quickly can I book?</AccordionTrigger>
              <AccordionContent className="text-blue-800">
                Same‑day bookings are often available and most pros reply within minutes. Tips to book faster:
                {' '}
                <Link href="/blog/book-a-tradesperson-fast" className="text-blue-700 underline hover:text-blue-900">How to Book a Tradesperson Fast</Link>.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* JSON-LD: FAQPage schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "How do I know a tradesperson is approved?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "All tradespeople are identity‑checked and verified. Learn more in our guide: https://your-domain.com/blog/how-we-verify-tradespeople",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Can I get instant quotes in my area?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Yes — use our quote tool for instant estimates and availability near you. Read more: https://your-domain.com/blog/instant-quotes-near-you",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "Are tradespeople insured?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "We check for valid public liability insurance to protect your job. Learn why this matters: https://your-domain.com/blog/insured-tradespeople",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How quickly can I book?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text:
                        "Same‑day bookings are often available and most pros reply within minutes. Tips to book faster: https://your-domain.com/blog/book-a-tradesperson-fast",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </section>

    </div>

  );
}
