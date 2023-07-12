import { useState } from 'react';
import { Accordion, ActionIcon, Center, Table, Text } from '@mantine/core';
import { useQueryClient } from '@tanstack/react-query';
import { Trash } from 'tabler-icons-react';

import { deleteDividend } from '@/services/dividend.service';
import { ChartData } from '@/types/chart-options.type';
import { Dividend } from '@/types/dividend.type';
import { formatCurrency } from '@/utils/currency-utils';
import { formatDate } from '@/utils/date-utils';
import { showError, showSuccess } from '@/utils/notification-utils';

type Props = {
  dividendsByMonth: ChartData['dividendsByMonth'];
};

function DividendDataTables({ dividendsByMonth }: Props) {
  if (dividendsByMonth.length === 0) {
    return (
      <Center>
        <Text>Nenhum dividendo encontrado</Text>
      </Center>
    );
  }

  const initialValue = dividendsByMonth[0].month;

  return (
    <Accordion variant='contained' radius='md' defaultValue={initialValue}>
      {dividendsByMonth.map(data => {
        return (
          <Accordion.Item key={data.month} value={data.month}>
            <Accordion.Control>{data.month}</Accordion.Control>
            <Accordion.Panel pl={36} pr={36}>
              {<DividendTable dividends={data.dividends} />}
            </Accordion.Panel>
          </Accordion.Item>
        );
      })}
    </Accordion>
  );
}

function DividendTable({ dividends }: { dividends: Dividend[] }) {
  const queryClient = useQueryClient();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  async function handleDelete(id: string) {
    if (confirm('Tem certeza que deseja deletar o dividendo?')) {
      try {
        setIsDeleting(true);

        await deleteDividend(id);
        queryClient.invalidateQueries(['statistics']);
        showSuccess('Dividendo removido com sucesso!');
      } catch {
        showError('Erro ao remover dividendo!');
      } finally {
        setIsDeleting(false);
      }
    }
  }

  return (
    <Table highlightOnHover>
      <thead>
        <tr>
          <th>Ativo</th>
          <th>Data</th>
          <th>Valor</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {dividends.map(dividend => (
          <tr key={dividend._id}>
            <td
              title={dividend.stock?.name}
            >{`${dividend.stock?.country_flag} ${dividend.stock?.ticker}`}</td>
            <td>{formatDate(dividend.paymentDate)}</td>
            <td
              title={
                dividend.country === 'US' ? formatCurrency(Number(dividend.cashAmount), 'US') : ''
              }
            >
              {dividend.formattedCashAmount}
            </td>
            <td>
              <ActionIcon
                color='red'
                variant='light'
                loading={isDeleting}
                onClick={() => {
                  if (dividend._id) {
                    handleDelete(dividend._id);
                  }
                }}
              >
                <Trash size={16} />
              </ActionIcon>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DividendDataTables;
