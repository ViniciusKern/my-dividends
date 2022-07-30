import React, { createContext, useState } from 'react';

import { DateRange } from '../components/common/DateRangeInput/DateRangeInput';
import { SegmentedControlOption } from '../components/common/SegmentedControl/SegmentedControl';

type UserPreferences = {
  selectedCountry: SegmentedControlOption;
  setSelectedCountry: (value: SegmentedControlOption) => void;
  dateRange: DateRange;
  setDateRange: (value: DateRange) => void;
};

export const COUNTRY_OPTIONS: SegmentedControlOption[] = [
  { id: 'R$', label: '🇧🇷' },
  { id: 'U$', label: '🇺🇸' },
];

const UserPreferencesContext = createContext<UserPreferences>({} as UserPreferences);

function initialDateRange(): DateRange {
  const currentYear = new Date().getFullYear();
  return {
    start: new Date(currentYear, 0, 1),
    end: new Date(currentYear, 11, 31),
  };
}

export const UserPreferencesContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<SegmentedControlOption>(
    COUNTRY_OPTIONS[0]
  );
  const [dateRange, setDateRange] = useState<DateRange>(initialDateRange);

  return (
    <UserPreferencesContext.Provider
      value={{ selectedCountry, setSelectedCountry, dateRange, setDateRange }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};

export default UserPreferencesContext;
