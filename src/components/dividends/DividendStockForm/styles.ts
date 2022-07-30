import styled from "styled-components";
import Button from "../../common/Button";

export const ListContainer = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;

  div:hover {
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.3);
  }
`;

export const StockSelectionContainer = styled.div`
  width: 100%;
`;

export const SearchContainer = styled.div`
  padding: 0 16px;
  width: 100%;
`;

export const StockCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const ChangeButton = styled(Button)`
  height: 32px;
  font-weight: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 8px;
`;
