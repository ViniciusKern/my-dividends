import { useState } from 'react';
import styled from 'styled-components';

import { Dividend } from '../../types/dividends.type';
import { Stock } from '../../types/stocks.types';
import ContainerWithLoading from '../common/ContainerWithLoading';
import SubHeader from '../common/SubHeader';
import DividendStockForm from './DividendStockForm/DividendStockForm';
import DividendValuesForm, { DividendValuesFormInputs } from './DividendValuesForm';

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 64px;
`;

export type OnSubmitParams = {
  id: string;
  stock: Stock;
  paymentDate: string;
  cashAmount: number;
};

type Props = {
  title: string;
  dividend?: Dividend;
  onSubmit: (params: OnSubmitParams) => Promise<void>;
};

export default function DividendForm({ title, dividend, onSubmit }: Props) {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(dividend?.stock ?? null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeSelectedStock = (stock: Stock | null) => {
    setSelectedStock(stock);
  };

  const onSubmitValuesForm = async ({ paymentDate, cashAmount }: DividendValuesFormInputs) => {
    if (selectedStock && !isSubmitting) {
      setIsSubmitting(true);

      onSubmit({ id: dividend?.id ?? '', stock: selectedStock, paymentDate, cashAmount }).finally(
        () => {
          setIsSubmitting(false);
        }
      );
    }
  };

  const isNewDividend = dividend === undefined;

  return (
    <ContainerWithLoading isLoading={isSubmitting}>
      <SubHeader title={title} />
      <FormContainer>
        <DividendStockForm
          stock={selectedStock}
          allowChange={isNewDividend}
          onChange={onChangeSelectedStock}
        />
        {selectedStock && <DividendValuesForm dividend={dividend} onSubmit={onSubmitValuesForm} />}
      </FormContainer>
    </ContainerWithLoading>
  );
}
