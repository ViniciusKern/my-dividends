import { useState } from "react";
import { CrossCircledIcon } from "@radix-ui/react-icons";

import { DatePicker } from "./date-picker";
import { Popover } from "./popover";
import { formatDate } from "@/utils/date-utils";
import { cn } from "@/utils/cn";

interface DatePickerInputProps {
  error?: string;
  className?: string;
  label: string;
  value?: Date;
  onChange?(date: Date): void;
}

export function DatePickerInput({
  className,
  label,
  value,
  onChange,
  error,
}: DatePickerInputProps) {
  const [selectedDate, setSelectedDate] = useState(value ?? new Date());
  const [open, setOpen] = useState(false);

  function handleChangeDate(date: Date) {
    setSelectedDate(date);
    setOpen(false);
    onChange?.(date);
  }

  return (
    <div>
      <Popover.Root open={open} onChange={setOpen}>
        <Popover.Trigger>
          <button
            type="button"
            className={cn(
              "bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-700 focus:border-gray-800 transition-all outline-none text-left relative pt-4",
              error && "!border-red-900",
              className
            )}
          >
            <span className="absolute text-gray-700 text-xs left-[13px] top-1 pointer-events-none">
              {label}
            </span>
            <span>{formatDate(selectedDate)}</span>
          </button>
        </Popover.Trigger>

        <Popover.Content>
          <DatePicker value={selectedDate} onChange={handleChangeDate} />
        </Popover.Content>
      </Popover.Root>

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
