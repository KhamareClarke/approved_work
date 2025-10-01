'use client';

import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SimpleChatSystem from '@/components/SimpleChatSystem';
import AISupportChat from '@/components/AISupportChat';

interface Props {
  mode: 'home' | 'register';
}

export default function FloatingAssistant({ mode }: Props) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (mode === 'home') {
      // Trigger the existing AI quote dialog
      document.getElementById('ai-quote-trigger')?.click();
      return;
    }
    setOpen(true);
  };

  // Build a lightweight demo room for register page using SimpleChatSystem
  const acceptedJobs = [
    {
      id: 'support',
      assigned_tradesperson_id: 'assistant',
      job_description: 'Live support and onboarding help',
      trade: 'Support',
      clients: { first_name: 'You', last_name: '' },
      tradespeople: { first_name: 'MyApproved', last_name: 'Assistant' },
    },
  ];

  return (
    <>
      {mode === 'register' && (
        <AISupportChat
          userId="guest"
          userType="client"
          userName="Guest"
        />
      )}

      {mode === 'home' && (
        <button
          type="button"
          onClick={handleClick}
          title="Ask AI for a quick quote"
          className="fixed bottom-6 right-6 z-[60] inline-flex items-center justify-center rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#fdbd18]/30"
          aria-label="Open AI quote assistant"
          style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#fdbd18, #ffe08a)' }}
        >
          <span className="absolute inset-0 rounded-full ring-1 ring-black/5" />
          <MessageCircle className="w-6 h-6 text-blue-900" />
          <span className="sr-only">Ask AI</span>
        </button>
      )}
    </>
  );
}
