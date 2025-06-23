
import { Button } from "@/components/ui/button";

interface GenderFilterProps {
  selectedGender: number | null;
  onGenderChange: (gender: number | null) => void;
}

export const GenderFilter = ({ selectedGender, onGenderChange }: GenderFilterProps) => {
  return (
    <div className="flex gap-2 mb-6">
      <Button
        variant={selectedGender === null ? "default" : "outline"}
        onClick={() => onGenderChange(null)}
        size="sm"
      >
        All
      </Button>
      <Button
        variant={selectedGender === 1 ? "default" : "outline"}
        onClick={() => onGenderChange(1)}
        size="sm"
      >
        Men
      </Button>
      <Button
        variant={selectedGender === 2 ? "default" : "outline"}
        onClick={() => onGenderChange(2)}
        size="sm"
      >
        Women
      </Button>
    </div>
  );
};
