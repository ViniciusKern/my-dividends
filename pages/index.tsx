import StatsGrid from '@/components/stats-grid';
import DividendView from '@/components/dividend-view';
import { Divider } from '@mantine/core';

function Home() {
  return (
    <>
      <DividendView />
      <Divider my='lg' />
      <StatsGrid />
    </>
  );
}

export default Home;
