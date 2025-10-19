
import React from 'react';

interface HeaderProps {
  title: string;
  showAdminButton?: boolean;
  onAdminClick?: () => void;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showAdminButton, onAdminClick, showBackButton, onBackClick }) => {
  return (
    <header className="bg-brand-secondary shadow-md p-4 sticky top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
           {showBackButton && (
            <button onClick={onBackClick} className="mr-4 text-brand-light hover:text-brand-text transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <h1 className="text-2xl font-bold text-brand-text">{title}</h1>
        </div>
        {showAdminButton && (
          <button
            onClick={onAdminClick}
            className="bg-brand-teal text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors"
          >
            Admin Panel
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
