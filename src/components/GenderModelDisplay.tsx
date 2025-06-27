
import { useState, useEffect } from "react";

interface GenderModelDisplayProps {
  selectedGender: number | null;
}

export const GenderModelDisplay = ({ selectedGender }: GenderModelDisplayProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [imageError, setImageError] = useState<boolean>(false);

  console.log('GenderModelDisplay rendered with selectedGender:', selectedGender);

  useEffect(() => {
    console.log('GenderModelDisplay useEffect triggered, selectedGender:', selectedGender);
    setImageError(false);
    if (selectedGender === 1) {
      console.log('Setting image URL to Men.jpg');
      setImageUrl('/Model/Men.jpg');
    } else if (selectedGender === 2) {
      console.log('Setting image URL to Women.jpg');
      setImageUrl('/Model/Women.jpg');
    } else {
      console.log('No gender selected, hiding image');
      setImageUrl(null);
    }
  }, [selectedGender]);

  const handleImageError = () => {
    console.error(`Failed to load gender model image: ${imageUrl}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    console.log(`Successfully loaded gender model image: ${imageUrl}`);
    setImageError(false);
  };

  console.log('Current imageUrl:', imageUrl, 'imageError:', imageError);

  if (!imageUrl) {
    console.log('No imageUrl, returning null');
    return null;
  }

  return (
    <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
      <div className="bg-white rounded-lg shadow-lg p-2 border">
        <div className="mb-2 text-xs text-gray-500 text-center">
          Debug: Attempting to load {imageUrl}
        </div>
        {imageError ? (
          <div className="w-32 h-40 bg-gray-200 rounded-md flex items-center justify-center">
            <p className="text-xs text-gray-500 text-center">Image not found<br/>{imageUrl}</p>
          </div>
        ) : (
          <img 
            src={imageUrl} 
            alt={selectedGender === 1 ? "Men's Collection" : "Women's Collection"}
            className="w-32 h-40 object-cover rounded-md transition-all duration-300 hover:scale-105"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        )}
        <p className="text-center text-sm font-medium mt-2 text-gray-700">
          {selectedGender === 1 ? "Men's Collection" : "Women's Collection"}
        </p>
      </div>
    </div>
  );
};
