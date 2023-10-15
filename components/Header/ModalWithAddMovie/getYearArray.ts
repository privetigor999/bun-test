import { map, rangeRight } from 'lodash';

export const getYearArray = (startYear: number = 2000) => {
  const currentYear = new Date().getFullYear();
  const years = rangeRight(startYear, currentYear + 1);
  
  const yearArray = map(years, (year: number) => {
    return { label: String(year), value: String(year) };
  });
  
  return yearArray;
}
