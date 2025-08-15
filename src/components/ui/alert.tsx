import React from 'react';

interface AlertProps {
  children: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({ children, className = '' }) => {
  return (
    <div className={`relative w-full rounded-lg border border-amber-200 bg-amber-50 p-4 ${className}`}>
      <div className="flex gap-3">
        {children}
      </div>
    </div>
  );
};

export const AlertDescription: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`text-sm text-amber-900 ${className}`}>
      {children}
    </div>
  );
};