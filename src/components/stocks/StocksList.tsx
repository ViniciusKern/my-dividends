import styled from "styled-components";

import { Stock } from "../../types/stocks.types";
import StockCard from "./StockCard";

const ListContainer = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
`;

type Props = {
  stocks: Stock[];
};

export default function StocksList({ stocks }: Props) {
  return (
    <ListContainer>
      {stocks.map((stock) => (
        <StockCard key={stock.id} stock={stock} editable />
      ))}
    </ListContainer>
  );
}
