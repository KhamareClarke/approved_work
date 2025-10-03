import Head from 'next/head';
import { useRouter } from 'next/router';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: object;
  noIndex?: boolean;
}

interface LocalBusinessSchema {
  name: string;
  description: string;
  url: string;
  telephone: string;
  address: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
  priceRange?: string;
  serviceArea?: string[];
}

const defaultLocalBusiness: LocalBusinessSchema = {
  name: "MyApproved",
  description: "Find trusted, approved tradespeople near you. Get instant quotes from verified, insured professionals.",
  url: "https://myapproved.com",
  telephone: "0800-123-4567",
  address: {
    addressCountry: "GB"
  },
  aggregateRating: {
    ratingValue: "4.9",
    reviewCount: "50000"
  },
  priceRange: "££",
  serviceArea: [
    "London", "Manchester", "Birmingham", "Leeds", "Liverpool", 
    "Bristol", "Sheffield", "Edinburgh", "Glasgow", "Cardiff"
  ]
};

export default function SEOHead({
  title = "Find Trusted Tradespeople Near You | MyApproved",
  description = "Get instant quotes from verified, insured tradespeople. 10,000+ approved professionals, £2M insurance protection, 4.9★ rating. Free quotes in 60 seconds.",
  keywords = [
    "tradespeople near me",
    "local tradesmen",
    "verified tradespeople",
    "insured tradesmen",
    "instant quotes",
    "home repairs",
    "professional services"
  ],
  canonicalUrl,
  ogImage = "/og-image.jpg",
  ogType = "website",
  structuredData,
  noIndex = false
}: SEOHeadProps) {
  const router = useRouter();
  const currentUrl = canonicalUrl || `https://myapproved.com${router.asPath}`;
  
  // Generate structured data for local business
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    ...defaultLocalBusiness,
    ...structuredData
  };

  // FAQ Schema for homepage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I know a tradesperson is approved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All tradespeople are identity-checked, qualified, and verified. We check credentials, insurance, and customer reviews before approval."
        }
      },
      {
        "@type": "Question",
        "name": "Can I get instant quotes in my area?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Use our AI-powered quote tool for instant estimates from verified tradespeople in your area. Most respond within 5 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Are tradespeople insured?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "All our tradespeople have valid public liability insurance (minimum £2M) to protect your property and give you peace of mind."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I book a tradesperson?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Same-day bookings are often available. Emergency services can be arranged within hours, while standard jobs typically book within 24-48 hours."
        }
      }
    ]
  };

  // Service Schema
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Tradesperson Matching Service",
    "description": "Professional tradesperson matching and quote service",
    "provider": {
      "@type": "Organization",
      "name": "MyApproved"
    },
    "serviceType": "Home Improvement Services",
    "areaServed": {
      "@type": "Country",
      "name": "United Kingdom"
    }
  };

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content={noIndex ? "noindex,nofollow" : "index,follow"} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={currentUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="MyApproved" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="MyApproved" />
      <meta name="theme-color" content="#1e40af" />
      
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
      
      {router.pathname === '/' && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(serviceSchema)
            }}
          />
        </>
      )}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="preconnect" href="https://randomuser.me" />
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
    </Head>
  );
}

// Location-specific SEO component
interface LocationSEOProps {
  location: string;
  service?: string;
}

export function LocationSEO({ location, service = "tradespeople" }: LocationSEOProps) {
  const title = `${service} in ${location} - Free Quotes Today | MyApproved`;
  const description = `Find trusted ${service.toLowerCase()} in ${location}. Get instant quotes from verified, insured professionals. Same-day availability. 4.9★ rated service.`;
  
  const locationSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `MyApproved ${location}`,
    "description": `Professional ${service.toLowerCase()} services in ${location}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location,
      "addressCountry": "GB"
    },
    "areaServed": {
      "@type": "City",
      "name": location
    }
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={[
        `${service.toLowerCase()} ${location}`,
        `${service.toLowerCase()} near me`,
        `local ${service.toLowerCase()}`,
        `${location} ${service.toLowerCase()}`,
        `verified ${service.toLowerCase()} ${location}`,
        `insured ${service.toLowerCase()} ${location}`
      ]}
      structuredData={locationSchema}
    />
  );
}

// Service-specific SEO component
interface ServiceSEOProps {
  service: string;
  location?: string;
}

export function ServiceSEO({ service, location }: ServiceSEOProps) {
  const locationText = location ? ` in ${location}` : " near you";
  const title = `${service}${locationText} - Instant Quotes | MyApproved`;
  const description = `Need a ${service.toLowerCase()}${locationText}? Get instant quotes from verified, insured professionals. Same-day availability. Book with confidence.`;
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service} Services`,
    "description": `Professional ${service.toLowerCase()} services`,
    "serviceType": service,
    "provider": {
      "@type": "Organization",
      "name": "MyApproved"
    }
  };

  return (
    <SEOHead
      title={title}
      description={description}
      keywords={[
        service.toLowerCase(),
        `${service.toLowerCase()} near me`,
        `local ${service.toLowerCase()}`,
        `verified ${service.toLowerCase()}`,
        `insured ${service.toLowerCase()}`,
        `${service.toLowerCase()} quotes`
      ]}
      structuredData={serviceSchema}
    />
  );
}
