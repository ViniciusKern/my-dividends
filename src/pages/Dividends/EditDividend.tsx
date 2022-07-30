import { useNavigate, useParams } from 'react-router-dom';

import ContainerWithLoading from '../../components/common/ContainerWithLoading';
import ToastManager from '../../components/common/Toast/ToastManager';
import DividendForm, { OnSubmitParams } from '../../components/dividends/DividendForm';
import DividendService from '../../firebase/services/DividendService';
import useFetch from '../../hooks/useFetch';
import { Dividend } from '../../types/dividends.type';

export default function EditDividend() {
  const navigate = useNavigate();
  const { dividendId } = useParams();

  if (!dividendId) {
    throw new Error('Dividend id param is missing!');
  }

  async function handleSubmit({ id, paymentDate, cashAmount }: OnSubmitParams) {
    try {
      await DividendService.update(id, paymentDate, cashAmount);

      navigate('/dividends');
      ToastManager.addSuccess('Dividend successfully updated');
    } catch {
      ToastManager.addError('Something went wrong, please try again');
    }
  }

  const { data: dividend, status } = useFetch<Dividend | null>(DividendService.get(dividendId));

  return (
    <ContainerWithLoading isLoading={status === 'loading'}>
      {dividend && (
        <DividendForm title='Edit dividend' dividend={dividend} onSubmit={handleSubmit} />
      )}
    </ContainerWithLoading>
  );
}
