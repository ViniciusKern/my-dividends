import StatsGrid from "@/components/stats-grid";
import DividendView from "@/components/dividend-view";

function Home() {
  return (
    <>
      <DividendView />
      <hr className="border-t border-gray-300 my-6" />
      <StatsGrid />
    </>
  );
}

export default Home;
