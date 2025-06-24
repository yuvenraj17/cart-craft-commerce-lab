
import { useState, useEffect } from "react";

interface GenderModelDisplayProps {
  selectedGender: number | null;
}

export const GenderModelDisplay = ({ selectedGender }: GenderModelDisplayProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (selectedGender === 1) {
      setImageUrl('/Model/Men.jpg');
    } else if (selectedGender === 2) {
      setImageUrl('/Model/Women.jpg');
    } else {
      setImageUrl(null);
    }
  }, [selectedGender]);

  if (!imageUrl) return null;

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
      <div className="bg-white rounded-lg shadow-lg p-2 border">
        <img 
          src={imageUrl} 
          alt={selectedGender === 1 ? "Men's Collection" : "Women's Collection"}
          className="w-32 h-40 object-cover rounded-md transition-all duration-300 hover:scale-105"
        />
        <p className="text-center text-sm font-medium mt-2 text-gray-700">
          {selectedGender === 1 ? "Men's Collection" : "Women's Collection"}
        </p>
      </div>
    </div>
  );
};
