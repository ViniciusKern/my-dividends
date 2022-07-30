import { StyledSpinner } from './styles';

type Props = {
  size?: number;
};

export default function Spinner({ size = 32 }: Props) {
  return <StyledSpinner fontSize={size} />;
}
