"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import QuoteModal from "./QuoteModal";

const QuoteModalContext = createContext({
  open: false,
  prefill: null,
  openModal: () => {},
  closeModal: () => {},
});

export function useQuoteModal() {
  return useContext(QuoteModalContext);
}

export default function QuoteModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState(null);

  const openModal = useCallback((nextPrefill = null) => {
    setPrefill(nextPrefill);
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
    setPrefill(null);
  }, []);

  const value = useMemo(
    () => ({ open, prefill, openModal, closeModal }),
    [open, prefill, openModal, closeModal]
  );

  return (
    <QuoteModalContext.Provider value={value}>
      {children}
      <QuoteModal open={open} onClose={closeModal} prefill={prefill} />
    </QuoteModalContext.Provider>
  );
}

