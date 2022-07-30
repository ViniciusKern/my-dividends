import styled from "styled-components";
import Spinner from "./Spinner/Spinner";

const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 14px;
    margin-top: 8px;
    display: block;
  }

  .form-item {
    position: relative;

    .loader {
      position: absolute;
      top: 30px;
      right: 16px;
    }

    label {
      font-weight: bold;
    }
  }
`;

type Props = {
  children: React.ReactNode;
  label?: { id: string; description: string };
  error?: string;
  isLoading?: boolean;
};

export default function FormField({
  children,
  label,
  error,
  isLoading,
}: Props) {
  return (
    <Container>
      <div className="form-item">
        {label && <label htmlFor={label.id}>{label.description}</label>}
        {children}
        {isLoading && (
          <div className="loader">
            <Spinner size={12} />
          </div>
        )}
        {error && <small>{error}</small>}
      </div>
    </Container>
  );
}
