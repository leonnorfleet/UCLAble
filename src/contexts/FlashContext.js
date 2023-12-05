import React, { useState, useEffect, createContext } from "react";

const FlashContext = createContext();

export function FlashProvider({ children }) {
  const [flashData, setFlashData] = useState({ show: false, msg: "", success: false });

  const flash = (newFlashData) => {
    setFlashData({ ...newFlashData });
  };

  useEffect(() => {
    let timeout;
    const { show } = flashData;

    if (show) {
      timeout = setTimeout(() => {
        setFlashData({ show: false, msg: "", success: false });
      }, 4800);
    }

    return () => clearTimeout(timeout);
  }, [flashData.show, flashData]);

  const contextValue = { flashData, flash };

  return <FlashContext.Provider value={contextValue}>{children}</FlashContext.Provider>;
}

export default FlashContext;
