import { Container } from './styles';

export type SegmentedControlOption = {
  id: string;
  label: string;
};

type Props = {
  label: string;
  options: SegmentedControlOption[];
  selected: SegmentedControlOption;
  onChange: (selected: SegmentedControlOption) => void;
};

export default function SegmentedControl({ label, options, selected, onChange }: Props) {
  return (
    <Container>
      <span>{label}:</span>
      <div>
        {options.map(option => (
          <button
            key={option.id}
            className={option.id === selected.id ? 'selected' : ''}
            onClick={() => onChange(option)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </Container>
  );
}
