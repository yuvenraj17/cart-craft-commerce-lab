
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Globe } from "lucide-react";

export interface CountryCurrency {
  country: string;
  currency: string;
  symbol: string;
  flag: string;
}

const countries: CountryCurrency[] = [
  { country: "United States", currency: "USD", symbol: "$", flag: "🇺🇸" },
  { country: "United Kingdom", currency: "GBP", symbol: "£", flag: "🇬🇧" },
  { country: "European Union", currency: "EUR", symbol: "€", flag: "🇪🇺" },
  { country: "Canada", currency: "CAD", symbol: "C$", flag: "🇨🇦" },
  { country: "Australia", currency: "AUD", symbol: "A$", flag: "🇦🇺" },
  { country: "Japan", currency: "JPY", symbol: "¥", flag: "🇯🇵" },
  { country: "India", currency: "INR", symbol: "₹", flag: "🇮🇳" },
  { country: "Brazil", currency: "BRL", symbol: "R$", flag: "🇧🇷" },
  { country: "Malaysia", currency: "MYR", symbol: "RM", flag: "🇲🇾" },
  { country: "Singapore", currency: "SGD", symbol: "S$", flag: "🇸🇬" },
];

interface CountryCurrencySelectorProps {
  selectedCountry: CountryCurrency;
  onCountryChange: (country: CountryCurrency) => void;
}

export const CountryCurrencySelector = ({
  selectedCountry,
  onCountryChange,
}: CountryCurrencySelectorProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="flex items-center gap-1">
            {selectedCountry.flag} {selectedCountry.currency}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white border shadow-lg">
        {countries.map((country) => (
          <DropdownMenuItem
            key={country.currency}
            onClick={() => onCountryChange(country)}
            className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 cursor-pointer"
          >
            <span className="text-lg">{country.flag}</span>
            <div className="flex flex-col">
              <span className="font-medium">{country.country}</span>
              <span className="text-sm text-gray-500">
                {country.currency} ({country.symbol})
              </span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
