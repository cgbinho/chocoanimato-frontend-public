import {
  format,
  addMilliseconds,
  parseISO,
  parse,
  isDate,
  addDays,
  isAfter
} from 'date-fns';

import ptBR from 'date-fns/locale/pt-BR';

export function formatCreateDate(data: any): string {
  return format(parseISO(data), "dd'/'MM'/'yy', às 'HH:mm'hs'", {
    locale: ptBR
  });
}

export function IsOrderExpired(date: string): boolean {
  const createdAt = parseISO(date);
  const expiresAt = addDays(createdAt, 7);
  return isAfter(new Date(), expiresAt);
}

interface MonthAndYearData {
  expMonth: string;
  expYear: string;
}

export function formatMonthAndYear(date: string): MonthAndYearData {
  const dateElements = date.split('/'); // '12/2030'
  const expMonth = dateElements[0]; // '12'
  const expYear = dateElements[1].substring(2); // '30'

  return { expMonth, expYear };
}
