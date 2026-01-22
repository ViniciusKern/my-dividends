import { CrossCircledIcon } from "@radix-ui/react-icons";
import { NumericFormat } from "react-number-format";
import { Input } from "./input";

interface InputCurrencyProps {
  error?: string;
  placeholder?: string;
  name: string;
  value?: string | number;
  onChange?(value: string): void;
}

export function InputCurrency({
  error,
  value,
  placeholder,
  name,
  onChange,
}: InputCurrencyProps) {
  return (
    <div className="relative">
      <NumericFormat
        decimalScale={2}
        decimalSeparator=","
        thousandSeparator="."
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        name={name}
        placeholder={placeholder}
        customInput={Input}
      />

      {error && (
        <div className="flex gap-2 items-center mt-2 text-red-900">
          <CrossCircledIcon />
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  );
}
