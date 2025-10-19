
import React, { useState } from 'react';
import { Copy } from '../icons';

interface PendingApprovalScreenProps {
  uid: string;
}

const PendingApprovalScreen: React.FC<PendingApprovalScreenProps> = ({ uid }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(uid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-brand-primary p-4">
      <div className="w-full max-w-md bg-brand-secondary rounded-lg shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-brand-text mb-4">Approval Required</h1>
        <p className="text-brand-light mb-6">
          Your account is pending approval from the administrator. Please copy your User ID below and send it to the admin to get access.
        </p>
        <div className="bg-brand-primary p-4 rounded-md mb-6">
          <p className="text-sm text-brand-light mb-2">Your Unique User ID:</p>
          <div className="flex items-center justify-between bg-brand-accent p-3 rounded-md">
            <code className="text-brand-text text-sm break-all text-left">{uid}</code>
            <button
              onClick={handleCopy}
              className="ml-4 p-2 bg-brand-teal text-white rounded-md hover:bg-opacity-80 transition-all focus:outline-none focus:ring-2 focus:ring-brand-teal focus:ring-opacity-50"
              aria-label="Copy UID"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
        {copied && (
          <p className="text-green-400 text-sm transition-opacity duration-300">
            Copied to clipboard!
          </p>
        )}
      </div>
    </div>
  );
};

export default PendingApprovalScreen;
