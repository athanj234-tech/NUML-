
import React, { useState, ReactNode } from 'react';
import { ChevronDown } from '../icons';

interface AccordionProps {
  title: string;
  children: ReactNode;
  startOpen?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <div className="border-b border-brand-accent">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 text-left text-xl font-semibold text-brand-text hover:bg-brand-secondary transition-colors"
      >
        <span>{title}</span>
        <ChevronDown className={`w-6 h-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}
      >
        <div className="p-4 bg-brand-primary">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
