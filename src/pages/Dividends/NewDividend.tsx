import { useNavigate } from 'react-router-dom';

import ToastManager from '../../components/common/Toast/ToastManager';
import DividendForm, { OnSubmitParams } from '../../components/dividends/DividendForm';
import DividendService from '../../firebase/services/DividendService';

export default function NewDividend() {
  const navigate = useNavigate();

  async function handleSubmit({ stock, paymentDate, cashAmount }: OnSubmitParams) {
    try {
      await DividendService.create(stock, paymentDate, cashAmount);

      navigate('/dividends');
      ToastManager.addSuccess('Dividend successfully added');
    } catch {
      ToastManager.addError('Something went wrong, please try again');
    }
  }

  return <DividendForm title='New dividend' onSubmit={handleSubmit} />;
}
