export function formatDateToISO(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR');
}

export function stringToDate(value: string) {
  const [year, month, day] = value.split('-');
  return new Date(Number(year), Number(month) - 1, Number(day));
}
