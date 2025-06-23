
import { createContext, useContext, useState, ReactNode } from "react";
import { CountryCurrency } from "@/components/CountryCurrencySelector";

const defaultCountry: CountryCurrency = {
  country: "United States",
  currency: "USD",
  symbol: "$",
  flag: "🇺🇸",
};

interface CurrencyContextType {
  selectedCountry: CountryCurrency;
  setSelectedCountry: (country: CountryCurrency) => void;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rates (in a real app, you'd fetch these from an API)
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.73,
  CAD: 1.25,
  AUD: 1.35,
  JPY: 110,
  INR: 74,
  BRL: 5.2,
  MYR: 4.28, 
  SGD: 1.33,  
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCountry, setSelectedCountry] = useState<CountryCurrency>(defaultCountry);

  const convertPrice = (price: number): number => {
    const rate = exchangeRates[selectedCountry.currency] || 1;
    return price * rate;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    return `${selectedCountry.symbol}${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        formatPrice,
        convertPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
};
