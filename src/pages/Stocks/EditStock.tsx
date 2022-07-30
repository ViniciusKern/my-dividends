import { useNavigate, useParams } from 'react-router-dom';

import ContainerWithLoading from '../../components/common/ContainerWithLoading';
import ToastManager from '../../components/common/Toast/ToastManager';
import StockForm, { OnSubmitParams } from '../../components/stocks/form/StockForm';
import StockService from '../../firebase/services/StockService';
import useFetch from '../../hooks/useFetch';
import { Stock } from '../../types/stocks.types';

export default function EditStock() {
  const navigate = useNavigate();
  const { stockId } = useParams();

  if (!stockId) {
    throw new Error('Stock id param is missing!');
  }

  async function handleSubmit({ id, name, ticker, category, logo }: OnSubmitParams) {
    try {
      await StockService.update(id, {
        name,
        ticker,
        categoryId: category,
        logo,
      });

      navigate('/stocks');
      ToastManager.addSuccess('Stock successfully updated');
    } catch {
      ToastManager.addError('Something went wrong, please try again');
    }
  }

  const { data: stock, status } = useFetch<Stock | null>(StockService.get(stockId));

  return (
    <ContainerWithLoading isLoading={status === 'loading'}>
      {stock && <StockForm stock={stock} onSubmit={handleSubmit} />}
    </ContainerWithLoading>
  );
}
