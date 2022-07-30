import ContainerWithLoading from "../../components/common/ContainerWithLoading";
import EmptyState from "../../components/common/EmptyState";
import SubHeader from "../../components/common/SubHeader";
import StocksList from "../../components/stocks/StocksList";
import StockService from "../../firebase/services/StockService";
import useFetch from "../../hooks/useFetch";
import { Stock } from "../../types/stocks.types";

export default function Stocks() {
  const { data: stocks, status } = useFetch<Stock[]>(StockService.list());

  return (
    <ContainerWithLoading isLoading={status === "loading"}>
      <SubHeader
        title="Stocks"
        link={{ to: "/stocks/new", label: "Add new stock" }}
      />
      {stocks &&
        (stocks.length > 0 ? (
          <StocksList stocks={stocks} />
        ) : (
          <EmptyState title="No stocks" />
        ))}
    </ContainerWithLoading>
  );
}
