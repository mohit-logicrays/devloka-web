import { createContext, useContext, useState } from "react";

interface UtilsContextType {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  preloader: boolean;
  updatePreloader: () => void;
}

const UtilsContext = createContext<UtilsContextType | null>(null);

export const UtilsProvider = ({ children }: { children: React.ReactNode }) => {
  const [toggle, setToggle] = useState(true);
  const [preloader, setPreloader] = useState(true);

  /**
   * A function that updates the preloader state to false.
   * This should be called once the app is loaded and the preloader should be hidden.
   */
  const updatePreloader = () => {
    setPreloader(false);
  };

  const data = { toggle, setToggle, preloader, updatePreloader };
  return <UtilsContext.Provider value={data}>{children}</UtilsContext.Provider>;
};

export const useUtilsContext = () => {
  const context = useContext(UtilsContext);
  if (!context) {
    throw new Error("useUtilsContext must be used within a UtilsProvider");
  }
  return context;
};
