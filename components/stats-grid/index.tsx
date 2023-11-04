import {
  Group,
  Paper,
  Text,
  ThemeIcon,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { ArrowUpRight, ArrowDownRight } from "tabler-icons-react";

import { useStats } from "@/hooks/queries/useStats";
import { formatCurrency } from "@/utils/currency-utils";
import { Spinner } from "../common/spinner";
import { cn } from "@/utils/cn";
import { DividendStat } from "@/types/stats.type";

export function StatsGrid() {
  const { data: stats, isLoading } = useStats();

  if (isLoading || !stats) {
    return (
      <div className="h-[100px] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <Title order={2} mb={16}>
        General Statistics
      </Title>
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {stats.map((stat) => (
          <StatItem key={stat.title} stat={stat} />
        ))}
      </SimpleGrid>
    </div>
  );
}

function StatItem({ stat }: { stat: DividendStat }) {
  const DiffIcon = Number(stat.diff) > 0 ? ArrowUpRight : ArrowDownRight;
  return (
    <Paper withBorder p="md" radius="md" key={stat.title}>
      <Group position="apart">
        <div>
          <Text c="dimmed" tt="uppercase" fw={700} fz="xs">
            {stat.title}
          </Text>
          <Text fw={700} fz="xl">
            {formatCurrency(stat.value)}
          </Text>
        </div>
        {stat.diff && (
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({
              color:
                Number(stat.diff) > 0
                  ? theme.colors.teal[6]
                  : theme.colors.red[6],
            })}
            size={38}
            radius="md"
          >
            <DiffIcon size="28" />
          </ThemeIcon>
        )}
      </Group>
      {stat.diff ? (
        <>
          <div>
            <span
              className={cn(
                "font-bold",
                Number(stat.diff) > 0 ? "text-teal-900" : "text-red-900"
              )}
            >
              {stat.diff.toFixed(2)}%
            </span>
            <span className="text-gray-700 text-xs">
              {` ${stat.comparingBasis}`}
            </span>
          </div>
        </>
      ) : null}
    </Paper>
  );
}

export default StatsGrid;
