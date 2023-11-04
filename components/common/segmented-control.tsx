import { cn } from "@/utils/cn";

interface SegmentedControlProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
}

function SegmentedControl({ value, options, onChange }: SegmentedControlProps) {
  return (
    <div className="bg-gray-100 h-10 flex items-center justify-evenly sm:justify-center px-1 rounded-md">
      {options.map((option) => {
        return (
          <button
            key={option.value}
            onClick={() => onChange(option.value)}
            className={cn(
              "px-4 xs:px-1 w-full sm:w-auto text-[10px] sm:text-base",
              option.value === value && "bg-white h-8 rounded-md shadow-sm"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export default SegmentedControl;
