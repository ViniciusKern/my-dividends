import { useContext, useMemo, useState } from 'react';
import styled from 'styled-components';

import ContainerWithLoading from '../../components/common/ContainerWithLoading';
import DividendChart from '../../components/dividends/DividendChart';
import DividendTable from '../../components/dividends/DividendTable';
import DividendService from '../../firebase/services/DividendService';
import useFetch from '../../hooks/useFetch';
import { Dividend } from '../../types/dividends.type';
import SegmentedControl, {
  SegmentedControlOption,
} from '../../components/common/SegmentedControl/SegmentedControl';
import SubHeader from '../../components/common/SubHeader';
import DateRangeInput, { DateRange } from '../../components/common/DateRangeInput/DateRangeInput';
import { ThemeProps } from '../../assets/styles/themes';
import EmptyState from '../../components/common/EmptyState';
import ToastManager from '../../components/common/Toast/ToastManager';
import UserPreferencesContext, { COUNTRY_OPTIONS } from '../../contexts/UserPreferencesContext';

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 8px 16px;
  margin-bottom: 8px;
  border-radius: 8px;
  background: ${({ theme }: ThemeProps) => theme.colors.lightBackground};
`;

export default function Dividends() {
  const {
    data: dividends,
    setData: setDividends,
    status,
  } = useFetch<Dividend[]>(DividendService.list());

  const { selectedCountry, setSelectedCountry, dateRange, setDateRange } =
    useContext(UserPreferencesContext);

  const filteredDividends: Dividend[] = useMemo(() => {
    if (!dividends) return [];
    return dividends.filter(
      dividend =>
        dividend.currency === selectedCountry.id &&
        dividend.paymentDate.getTime() >= dateRange.start.getTime() &&
        dividend.paymentDate.getTime() <= dateRange.end.getTime()
    );
  }, [dividends, selectedCountry, dateRange]);

  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete(id: string) {
    if (confirm('Are you sure you want to delete this dividend?')) {
      try {
        setIsDeleting(true);

        await DividendService.delete(id);
        setDividends(dividends?.filter(dividend => dividend.id !== id));
      } catch {
        ToastManager.addError('Something went wrong, please try again');
      } finally {
        setIsDeleting(false);
      }
    }
  }

  function handleChangeCountry(selected: SegmentedControlOption) {
    setSelectedCountry(selected);
  }

  function handleChangeDateRange(range: DateRange) {
    setDateRange(range);
  }

  return (
    <ContainerWithLoading isLoading={status === 'loading' || isDeleting}>
      <SubHeader title='Dividends' link={{ to: '/dividends/new', label: 'New dividend' }} />

      <FilterContainer>
        <DateRangeInput range={dateRange} onChange={handleChangeDateRange} />
        <SegmentedControl
          label='Country'
          options={COUNTRY_OPTIONS}
          selected={selectedCountry}
          onChange={handleChangeCountry}
        />
      </FilterContainer>

      {filteredDividends.length > 0 ? (
        <>
          <DividendChart
            dividends={filteredDividends}
            startDate={dateRange.start}
            endDate={dateRange.end}
          />
          <DividendTable dividends={filteredDividends} onDelete={handleDelete} />
        </>
      ) : (
        <EmptyState title='No dividends' />
      )}
    </ContainerWithLoading>
  );
}
