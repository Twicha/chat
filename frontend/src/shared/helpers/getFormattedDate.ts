import { format } from "date-fns";
import { ru } from "date-fns/locale";

interface IOptions {
  locale?: Locale;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate?: number;
  useAdditionalWeekYearTokens?: boolean;
  useAdditionalDayOfYearTokens?: boolean;
}

export const getFormattedDate = (
  date: string | number,
  dateFormat: string = "dd.MM.yyyy",
  options?: IOptions
): string =>
  format(new Date(date), dateFormat, {
    locale: ru,
    ...options,
  });
