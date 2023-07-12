import { Group, Paper, Text, ThemeIcon, SimpleGrid, Title, Center, Loader } from '@mantine/core';
import { ArrowUpRight, ArrowDownRight } from 'tabler-icons-react';

import { useStats } from '@/hooks/queries/useStats';
import { formatCurrency } from '@/utils/currency-utils';

export function StatsGrid() {
  const { data: stats, isLoading } = useStats();

  if (isLoading || !stats) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const data = [
    {
      title: `Média Mensal ${stats.previous.year}`,
      value: formatCurrency(stats.previous.monthAverage),
      diff: stats.previous.monthDiff.toFixed(2),
      comparationBase: stats.previous.year - 1,
    },
    {
      title: `Média Mensal ${stats.current.year}`,
      value: formatCurrency(stats.current.monthAverage),
      diff: stats.current.monthDiff.toFixed(2),
      comparationBase: stats.current.year - 1,
    },
    {
      title: `Soma Total ${stats.previous.year}`,
      value: formatCurrency(stats.previous.total),
      diff: stats.previous.totalDiff.toFixed(2),
      comparationBase: stats.previous.year - 1,
    },
    {
      title: `Soma Total ${stats.current.year}`,
      value: formatCurrency(stats.current.total),
      diff: stats.current.totalDiff.toFixed(2),
      comparationBase: `o mesmo período de ${stats.current.year - 1}`,
    },
  ];

  const statsItems = data.map(stat => {
    const DiffIcon = Number(stat.diff) > 0 ? ArrowUpRight : ArrowDownRight;

    return (
      <Paper withBorder p='md' radius='md' key={stat.title}>
        <Group position='apart'>
          <div>
            <Text c='dimmed' tt='uppercase' fw={700} fz='xs'>
              {stat.title}
            </Text>
            <Text fw={700} fz='xl'>
              {stat.value}
            </Text>
          </div>
          <ThemeIcon
            color='gray'
            variant='light'
            sx={theme => ({
              color: Number(stat.diff) > 0 ? theme.colors.teal[6] : theme.colors.red[6],
            })}
            size={38}
            radius='md'
          >
            <DiffIcon size='28' />
          </ThemeIcon>
        </Group>
        <Text c='dimmed' fz='sm' mt='md'>
          <Text component='span' c={Number(stat.diff) > 0 ? 'teal' : 'red'} fw={700}>
            {stat.diff}%
          </Text>{' '}
          comparando com {stat.comparationBase}
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <Title order={2} mb={16}>
        Estatísticas
      </Title>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {statsItems}
      </SimpleGrid>
    </div>
  );
}

export default StatsGrid;
