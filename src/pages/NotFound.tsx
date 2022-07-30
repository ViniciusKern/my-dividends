import styled from 'styled-components';

export const Container = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: 32px;
  padding: 36px;
`;

export default function NotFound() {
  return (
    <Container>
      <p>Page Not found!</p>
    </Container>
  );
}
