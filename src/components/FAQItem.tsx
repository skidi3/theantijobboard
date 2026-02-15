"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 group/faq">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="pr-8 font-medium text-neutral-900 group-hover/faq:text-neutral-600 transition-colors duration-300">
          {question}
        </span>
        <div className={`shrink-0 w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-neutral-900 border-neutral-900' : 'group-hover/faq:border-neutral-400'}`}>
          <ChevronDown
            className={`h-4 w-4 transition-all duration-300 ${
              isOpen ? "rotate-180 text-white" : "text-neutral-400"
            }`}
          />
        </div>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-neutral-500 leading-relaxed pr-12">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}
