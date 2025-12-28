import React, { ReactNode } from "react";
import { Toaster, toast as hotToast } from "react-hot-toast";

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};

// Re-export toast with types
export const toast = hotToast;