'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import FloatingAssistant from '@/components/FloatingAssistant';

export default function GlobalAssistant() {
  const pathname = usePathname();
  // Use homepage-specific behavior on '/', otherwise open in-page chat support
  const isHome = pathname === '/' || pathname === '';
  return <FloatingAssistant mode={isHome ? 'home' : 'register'} />;
}
