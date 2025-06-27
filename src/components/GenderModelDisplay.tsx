
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
    <div 
      className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-10"
      style={{
        backgroundImage: imageError ? 'none' : `url(${imageUrl})`,
        backgroundColor: imageError ? '#f3f4f6' : 'transparent'
      }}
    >
      {/* Hidden image element for loading and error handling */}
      <img 
        src={imageUrl} 
        alt={selectedGender === 1 ? "Men's Collection Background" : "Women's Collection Background"}
        className="hidden"
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      
      {imageError && (
        <div className="absolute bottom-4 left-4 bg-white/80 rounded px-2 py-1 text-xs text-gray-600">
          Background image not found: {imageUrl}
        </div>
      )}
    </div>
  );
};
