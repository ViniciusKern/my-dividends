import { useNavigate } from 'react-router-dom';

import ToastManager from '../../components/common/Toast/ToastManager';
import StockForm, { OnSubmitParams } from '../../components/stocks/form/StockForm';
import StockService from '../../firebase/services/StockService';

export default function NewStock() {
  const navigate = useNavigate();

  async function handleSubmit({ name, ticker, category, logo }: OnSubmitParams) {
    try {
      await StockService.create(name, ticker, category, logo);

      navigate('/stocks');
      ToastManager.addSuccess('Stock successfully added');
    } catch {
      ToastManager.addError('Something went wrong, please try again');
    }
  }

  return <StockForm onSubmit={handleSubmit} />;
}
