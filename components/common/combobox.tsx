import { Fragment, useMemo, useState } from "react";
import { Combobox as HeadlessCombobox, Transition } from "@headlessui/react";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { cn } from "@/utils/cn";

export interface ComboboxOption {
  value: string;
  label: string;
  detail?: string;
}

interface SelectProps {
  className?: string;
  placeholder?: string;
  options: ComboboxOption[];
  value?: ComboboxOption | null;
  onChange?(value: string | null): void;
}

export function Combobox({
  options,
  value,
  placeholder,
  onChange,
}: SelectProps) {
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (query === "") return options;

    return options.filter((option) =>
      option.label
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );
  }, [options, query]);

  return (
    <div>
      <HeadlessCombobox
        value={value}
        onChange={(option) => {
          onChange?.(option?.value ?? null);
        }}
      >
        <div>
          <div className="bg-white w-full rounded-lg border border-gray-500 px-3 h-[52px] text-gray-800 focus:border-gray-800 transition-all outline-none text-left relative pt-4">
            <label
              className={cn(
                "absolute z-10 top-1/2 -translate-y-1/2 left-3 text-gray-700 pointer-events-none",
                (value || query) &&
                  "text-xs left-[13px] top-1 transition-all translate-y-0"
              )}
            >
              {placeholder}
            </label>
            <HeadlessCombobox.Button className={"w-full outline-none"}>
              <HeadlessCombobox.Input
                className={"w-full outline-none"}
                displayValue={(option: ComboboxOption) => option?.label}
                onChange={(event) => setQuery(event.target.value)}
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <CaretSortIcon
                  className="h-5 w-5 text-gray-500"
                  aria-hidden="true"
                />
              </div>
            </HeadlessCombobox.Button>
            {value?.detail && (
              <div className="absolute text-gray-700 top-0 h-full right-9 flex items-center">
                <span className="text-sm select-none">{value.detail}</span>
              </div>
            )}
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <HeadlessCombobox.Options className="absolute z-50 max-h-60 w-[95%] overflow-auto rounded-md bg-white py-1 text-base shadow-lg focus:outline-none sm:text-sm">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <HeadlessCombobox.Option
                    key={option.value}
                    className={({ active }) =>
                      `relative flex justify-between cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-teal-800 text-white" : "text-gray-900"
                      }`
                    }
                    value={option}
                  >
                    <span className="block truncate">{option.label}</span>
                    {option.detail && <span>{option.detail}</span>}
                  </HeadlessCombobox.Option>
                ))
              )}
            </HeadlessCombobox.Options>
          </Transition>
        </div>
      </HeadlessCombobox>
    </div>
  );
}
