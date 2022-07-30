import { useEffect, useState } from "react";

import { Stock } from "../../../types/stocks.types";
import StockService from "../../../firebase/services/StockService";
import Input from "../../common/Input";
import Spinner from "../../common/Spinner/Spinner";
import StockCard from "../../stocks/StockCard";
import editButton from "../../../assets/icons/edit.png";
import {
  ChangeButton,
  ListContainer,
  SearchContainer,
  StockCardContainer,
  StockSelectionContainer,
} from "./styles";

type Props = {
  stock: Stock | null;
  allowChange: boolean;
  onChange: (stock: Stock | null) => void;
};

export default function DividendStockForm({
  stock,
  allowChange,
  onChange,
}: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [filteredStocks, setFilteredStocks] = useState<Stock[]>([]);

  useEffect(() => {
    setIsSearching(true);

    const debounceTimeout = setTimeout(async () => {
      try {
        const filteredStocks = await StockService.search(searchTerm);
        setFilteredStocks(filteredStocks);
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleClearSelectedStock() {
    setSearchTerm("");
    onChange(null);
  }

  return (
    <>
      {stock ? (
        <StockCardContainer>
          <StockCard stock={stock} />
          {allowChange && (
            <ChangeButton onClick={handleClearSelectedStock}>
              <img src={editButton} />
              Change stock
            </ChangeButton>
          )}
        </StockCardContainer>
      ) : (
        <StockSelectionContainer>
          <SearchContainer>
            <h4>Select the stock</h4>
            <Input
              autoFocus
              placeholder="Search by name or ticker"
              onChange={handleSearch}
            />
          </SearchContainer>
          {isSearching ? (
            <Spinner />
          ) : (
            <ListContainer>
              {filteredStocks.map((stock) => (
                <StockCard
                  key={stock.id}
                  stock={stock}
                  onClick={() => onChange(stock)}
                />
              ))}
            </ListContainer>
          )}
        </StockSelectionContainer>
      )}
    </>
  );
}
