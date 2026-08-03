"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface PaymentSessionContextValue {
  sessionId: string | null;
  setSessionId: (sessionId: string | null) => void;
}

const PaymentSessionContext = createContext<PaymentSessionContextValue>({
  sessionId: null,
  setSessionId: () => {},
});

export function PaymentSessionProvider({ children }: { children: ReactNode }) {
  const [sessionId, setSessionId] = useState<string | null>(null);

  return (
    <PaymentSessionContext.Provider value={{ sessionId, setSessionId }}>
      {children}
    </PaymentSessionContext.Provider>
  );
}

export function usePaymentSession() {
  return useContext(PaymentSessionContext);
}
