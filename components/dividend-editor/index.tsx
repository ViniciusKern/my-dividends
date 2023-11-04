import { useEffect, useState } from "react";

import { Stock } from "@/types/stock.types";
import { Dividend } from "@/types/dividend.type";
import { useDollarExchangeRate } from "@/hooks/queries/useDollarExchangeRate";
import { Combobox, ComboboxOption } from "../common/combobox";
import { Input } from "../common/input";
import { InputCurrency } from "../common/input-currency";
import { DatePickerInput } from "../common/date-picker-input";
import { Button } from "../common/button";
import { cn } from "@/utils/cn";
import { Spinner } from "../common/spinner";

type Props = {
  stocks: Stock[];
  onSave: (dividend: Dividend) => void;
  onClose: () => void;
};

function DividendEditor({ stocks, onSave, onClose }: Props) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [selectedStockOption, setSelectedStockOption] =
    useState<ComboboxOption | null>(null);

  const [paymentDate, setPaymentDate] = useState<Date>(() => new Date());
  const [cashAmount, setCashAmount] = useState<number | undefined>(undefined);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { data: dollarValue } = useDollarExchangeRate(paymentDate);

  useEffect(() => {
    setSelectedStockOption(toComboboxOption(selectedStock));
  }, [selectedStock]);

  function handleStockChange(stockId: string) {
    setSelectedStock(stocks.find((stock) => stock._id === stockId) ?? null);
  }

  function handlePaymentDateChange(value: Date) {
    setPaymentDate(value);
  }

  function handleChangeCashAmount(value: string) {
    setCashAmount(Number(value));
  }

  function handleSave() {
    if (selectedStock) {
      setIsSaving(true);
      onSave({
        refStock: selectedStock._id,
        country: selectedStock.country,
        dollarRate: String(dollarValue),
        cashAmount: String(cashAmount),
        paymentDate,
      });
    }
  }

  const isForeign = selectedStock?.country !== "BR";

  return (
    <div className="h-[300px]">
      {isSaving ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <Combobox
              placeholder="Stock"
              value={selectedStockOption}
              onChange={handleStockChange}
              options={stocks.map((stock) => toComboboxOption(stock)!)}
            />

            {selectedStock && (
              <div className={cn("grid gap-6", isForeign && "grid-cols-2")}>
                <DatePickerInput
                  label="Payment Date"
                  value={paymentDate}
                  onChange={handlePaymentDateChange}
                />

                {isForeign && (
                  <Input
                    disabled
                    name="dollarRate"
                    placeholder="Dollar Rate (R$)"
                    type="number"
                    value={dollarValue}
                  />
                )}

                <InputCurrency
                  name="dividendValue"
                  placeholder={`Value (${isForeign ? "U$" : "R$"})`}
                  value={cashAmount}
                  onChange={handleChangeCashAmount}
                />
              </div>
            )}
          </div>
          <FooterButtons
            disableSave={!cashAmount || !paymentDate || !selectedStock}
            onSave={handleSave}
            onClose={onClose}
          />
        </div>
      )}
    </div>
  );
}

function FooterButtons({
  disableSave,
  onSave,
  onClose,
}: {
  disableSave: boolean;
  onSave: () => void;
  onClose: () => void;
}) {
  return (
    <div className="flex gap-6 justify-end">
      <Button className="w-1/2" variant="ghost" size="sm" onClick={onClose}>
        Cancel
      </Button>
      <Button
        className="w-1/2"
        size="sm"
        disabled={disableSave}
        onClick={onSave}
      >
        Save
      </Button>
    </div>
  );
}

function toComboboxOption(stock: Stock | null): ComboboxOption | null {
  if (!stock) return null;

  return {
    value: stock._id,
    label: `${stock.name} (${stock.ticker})`,
    detail: `${stock.category} ${stock.country_flag}`,
  };
}

export default DividendEditor;
