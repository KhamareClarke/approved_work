import { useEffect } from 'react';
import { useRouter } from 'next/router';

// Google Analytics 4
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX';

// Initialize Google Analytics
export function initGA() {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', GA_TRACKING_ID, {
      page_title: document.title,
      page_location: window.location.href,
    });
  }
}

// Track page views
export function trackPageView(url: string, title?: string) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    });
  }
}

// Track events
interface EventParams {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

export function trackEvent({ action, category, label, value, custom_parameters }: EventParams) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...custom_parameters,
    });
  }
}

// Conversion tracking
export function trackConversion(conversionType: string, value?: number, currency = 'GBP') {
  trackEvent({
    action: 'conversion',
    category: 'engagement',
    label: conversionType,
    value: value,
    custom_parameters: {
      currency: currency,
      conversion_type: conversionType,
    },
  });
}

// Quote request tracking
export function trackQuoteRequest(tradeType: string, location: string, urgency: string) {
  trackEvent({
    action: 'quote_request',
    category: 'lead_generation',
    label: tradeType,
    custom_parameters: {
      trade_type: tradeType,
      location: location,
      urgency: urgency,
      timestamp: new Date().toISOString(),
    },
  });
  
  // Also track as conversion
  trackConversion('quote_request');
}

// User journey tracking
export function trackUserJourney(step: string, additionalData?: Record<string, any>) {
  trackEvent({
    action: 'user_journey',
    category: 'engagement',
    label: step,
    custom_parameters: {
      journey_step: step,
      ...additionalData,
    },
  });
}

// Form interaction tracking
export function trackFormInteraction(formName: string, fieldName: string, action: string) {
  trackEvent({
    action: 'form_interaction',
    category: 'engagement',
    label: `${formName}_${fieldName}`,
    custom_parameters: {
      form_name: formName,
      field_name: fieldName,
      interaction_type: action,
    },
  });
}

// CTA click tracking
export function trackCTAClick(ctaName: string, location: string) {
  trackEvent({
    action: 'cta_click',
    category: 'engagement',
    label: ctaName,
    custom_parameters: {
      cta_name: ctaName,
      cta_location: location,
    },
  });
}

// Search tracking
export function trackSearch(query: string, results: number, filters?: Record<string, any>) {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: query,
    value: results,
    custom_parameters: {
      search_query: query,
      results_count: results,
      filters: filters,
    },
  });
}

// Performance tracking
export function trackPerformance(metric: string, value: number, unit: string) {
  trackEvent({
    action: 'performance',
    category: 'technical',
    label: metric,
    value: value,
    custom_parameters: {
      metric_name: metric,
      metric_value: value,
      metric_unit: unit,
    },
  });
}

// Error tracking
export function trackError(errorType: string, errorMessage: string, errorLocation?: string) {
  trackEvent({
    action: 'error',
    category: 'technical',
    label: errorType,
    custom_parameters: {
      error_type: errorType,
      error_message: errorMessage,
      error_location: errorLocation,
      user_agent: navigator.userAgent,
    },
  });
}

// Analytics Provider Component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    // Initialize GA on mount
    initGA();

    // Track route changes
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // Track page performance
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        // Track page load time
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          trackPerformance('page_load_time', navigation.loadEventEnd - navigation.fetchStart, 'ms');
        }

        // Track Core Web Vitals
        if ('web-vital' in window) {
          // This would require the web-vitals library
          // import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';
        }
      });
    }
  }, []);

  return <>{children}</>;
}

// Hook for tracking component interactions
export function useAnalytics() {
  return {
    trackEvent,
    trackConversion,
    trackQuoteRequest,
    trackUserJourney,
    trackFormInteraction,
    trackCTAClick,
    trackSearch,
    trackPerformance,
    trackError,
  };
}

// HOC for automatic component tracking
export function withAnalytics<T extends Record<string, any>>(
  WrappedComponent: React.ComponentType<T>,
  componentName: string
) {
  return function AnalyticsWrappedComponent(props: T) {
    useEffect(() => {
      trackEvent({
        action: 'component_view',
        category: 'engagement',
        label: componentName,
      });
    }, []);

    return <WrappedComponent {...props} />;
  };
}

// Hotjar Integration
export function initHotjar() {
  if (typeof window !== 'undefined') {
    const hotjarId = process.env.NEXT_PUBLIC_HOTJAR_ID;
    if (hotjarId) {
      (function(h: any, o: any, t: any, j: any, a?: any, r?: any) {
        h.hj = h.hj || function() { (h.hj.q = h.hj.q || []).push(arguments) };
        h._hjSettings = { hjid: hotjarId, hjsv: 6 };
        a = o.getElementsByTagName('head')[0];
        r = o.createElement('script'); r.async = 1;
        r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
        a.appendChild(r);
      })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    }
  }
}

// Facebook Pixel Integration
export function initFacebookPixel() {
  if (typeof window !== 'undefined') {
    const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
    if (pixelId) {
      !(function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
        if (f.fbq) return;
        n = f.fbq = function() {
          n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
        };
        if (!f._fbq) f._fbq = n;
        n.push = n;
        n.loaded = !0;
        n.version = '2.0';
        n.queue = [];
        t = b.createElement(e);
        t.async = !0;
        t.src = v;
        s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s);
      })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

      (window as any).fbq('init', pixelId);
      (window as any).fbq('track', 'PageView');
    }
  }
}

// Track Facebook Pixel events
export function trackFBEvent(eventName: string, parameters?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).fbq) {
    (window as any).fbq('track', eventName, parameters);
  }
}

// Complete Analytics Setup Component
export function AnalyticsSetup() {
  useEffect(() => {
    // Initialize all analytics services
    initGA();
    initHotjar();
    initFacebookPixel();

    // Track initial page view
    trackPageView(window.location.href);
  }, []);

  return (
    <>
      {/* Google Analytics */}
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`} />
      
      {/* Google Tag Manager (optional) */}
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `,
          }}
        />
      )}
    </>
  );
}
