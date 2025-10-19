
import React from 'react';
import Spinner from '../ui/Spinner';

const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-brand-primary">
      <Spinner />
      <p className="mt-4 text-lg text-brand-light">Initializing NUML Scholar...</p>
    </div>
  );
};

export default LoadingScreen;
