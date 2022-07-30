import { Container } from './styles';

export type DateRange = {
  start: Date;
  end: Date;
};

type Props = {
  range: DateRange;
  onChange: (range: DateRange) => void;
};

const MIN_YEAR = 2015;

export default function DateRangeInput({ range, onChange }: Props) {
  const start = range.start.toISOString().substring(0, 7);
  const end = range.end.toISOString().substring(0, 7);

  function handleChangeStart(event: React.ChangeEvent<HTMLInputElement>) {
    const [year, month] = event.target.value.split('-');
    if (Number(year) < MIN_YEAR) return;

    const newDate = new Date(Number(year), Number(month) - 1, 1);

    if (isNaN(newDate.getTime())) return;

    onChange({ start: newDate, end: range.end });
  }

  function handleChangeEnd(event: React.ChangeEvent<HTMLInputElement>) {
    const [year, month] = event.target.value.split('-');
    if (Number(year) < MIN_YEAR) return;

    const newDate = new Date(Number(year), Number(month), 0);

    if (isNaN(newDate.getTime())) return;

    onChange({ start: range.start, end: newDate });
  }

  return (
    <Container>
      <span>From:</span>
      <input type='month' value={start} min={`${MIN_YEAR}-01`} onChange={handleChangeStart} />
      <span>To:</span>
      <input type='month' value={end} min={start} onChange={handleChangeEnd} />
    </Container>
  );
}
