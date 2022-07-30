import styled from "styled-components";
import { ThemeProps } from "../../assets/styles/themes";

const Container = styled.div<ThemeProps>`
  width: 100%;
  min-height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  font-weight: bold;
`;

type Props = {
  title: string;
};

export default function EmptyState({ title }: Props) {
  return <Container>{title}</Container>;
}
