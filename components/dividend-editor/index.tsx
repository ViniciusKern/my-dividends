import { forwardRef, useState } from 'react';
import {
  Group,
  Container,
  Text,
  Select,
  Input,
  Button,
  createStyles,
  SimpleGrid,
  Loader,
  Center,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';

import { Stock } from '@/types/stock.types';
import { Dividend } from '@/types/dividend.type';
import { useDollarExchangeRate } from '@/hooks/queries/useDollarExchangeRate';

type Props = {
  stocks: Stock[];
  onSave: (dividend: Dividend) => void;
  onClose: () => void;
};

function DividendEditor({ stocks, onSave, onClose }: Props) {
  const { classes } = useStyles();

  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [paymentDate, setPaymentDate] = useState<Date>(() => new Date());
  const [cashAmount, setCashAmount] = useState<number | undefined>(undefined);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const { data: dollarValue } = useDollarExchangeRate(paymentDate);

  function handleStockChange(stockId: string) {
    setSelectedStock(stocks.find(stock => stock._id === stockId) ?? null);
  }

  function handlePaymentDateChange(value: Date) {
    setPaymentDate(value);
  }

  function handleChangeCashAmount(event: React.ChangeEvent<HTMLInputElement>) {
    setCashAmount(Number(event.target.value));
  }

  function handleSave() {
    if (selectedStock) {
      setIsSaving(true);
      onSave({
        refStock: selectedStock._id,
        country: selectedStock.country,
        dollarRate: String(dollarValue),
        cashAmount: String(cashAmount),
        paymentDate,
      });
    }
  }

  const isForeign = selectedStock?.country !== 'BR';

  return (
    <Container h={500}>
      {isSaving ? (
        <Center h={500}>
          <Loader />
        </Center>
      ) : (
        <>
          <h3>Novo Dividendo {selectedStock && selectedStock.country_flag}</h3>
          <Select
            required
            label='Ativo'
            placeholder='Selecione o ativo que pagou o dividendo'
            itemComponent={SelectItem}
            data={stocks.map(stock => ({
              label: `${stock.name} (${stock.ticker})`,
              detail: `${stock.category} ${stock.country_flag}`,
              value: stock._id,
            }))}
            searchable
            maxDropdownHeight={340}
            mt={16}
            mb={16}
            nothingFound='Nenhum resultado encontrado'
            onChange={handleStockChange}
          />

          {selectedStock && (
            <>
              <SimpleGrid cols={isForeign ? 2 : 1}>
                <DateInput
                  required
                  valueFormat='DD/MM/YYYY'
                  label='Data do Pagamento'
                  maw={160}
                  value={paymentDate}
                  onChange={handlePaymentDateChange}
                />

                {isForeign && (
                  <Input.Wrapper label='Cotação do Dólar (R$)' maw={160} required>
                    <Input type='number' value={dollarValue} disabled />
                  </Input.Wrapper>
                )}

                <Input.Wrapper label={`Valor (${isForeign ? 'U$' : 'R$'})`} maw={160} required>
                  <Input type='number' value={cashAmount} onChange={handleChangeCashAmount} />
                </Input.Wrapper>
              </SimpleGrid>

              <Group spacing='xl' className={classes.footer}>
                <Button w={140} color='red' variant='light' onClick={onClose}>
                  Cancelar
                </Button>
                <Button
                  w={140}
                  disabled={!cashAmount || !paymentDate || !selectedStock}
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </Group>
            </>
          )}
        </>
      )}
    </Container>
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: string;
  label: string;
  detail: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(function SelectItem(
  { label, detail, ...others }: ItemProps,
  ref
) {
  const { classes } = useStyles();

  return (
    <div ref={ref} {...others}>
      <div className={classes.selectContent}>
        <Text size='sm'>{label}</Text>
        <Text size='xs'>{detail}</Text>
      </div>
    </div>
  );
});

const useStyles = createStyles(theme => ({
  selectContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
  },
  footer: {
    position: 'fixed',
    bottom: theme.spacing.md,
    right: theme.spacing.md,
  },
}));

export default DividendEditor;
