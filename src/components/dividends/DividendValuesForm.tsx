import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { Dividend } from "../../types/dividends.type";
import { formatDateToISO } from "../../utils/dateUtils";
import Button from "../common/Button";
import FormGroup from "../common/FormGroup";
import Input from "../common/Input";

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  button {
    margin-top: 24px;
  }
`;

export type DividendValuesFormInputs = {
  paymentDate: string;
  cashAmount: number;
};

type Props = {
  dividend?: Dividend;
  onSubmit: SubmitHandler<DividendValuesFormInputs>;
};

export default function DividendValuesForm({ dividend, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DividendValuesFormInputs>({
    mode: "onBlur",
    defaultValues: {
      paymentDate: formatDateToISO(dividend?.paymentDate ?? new Date()),
      cashAmount: Number(dividend?.cashAmount),
    },
  });

  const dateError = errors.paymentDate?.message;
  const cashAmountError = errors.cashAmount?.message;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup
        label={{ id: "paymentDate", description: "Payment Date" }}
        error={dateError}
      >
        <Input
          id="paymentDate"
          type="date"
          {...register("paymentDate", {
            required: "Payment Date is required",
          })}
          error={Boolean(dateError)}
        />
      </FormGroup>
      <FormGroup
        label={{ id: "cashAmount", description: "Cash Amount" }}
        error={cashAmountError}
      >
        <Input
          id="cashAmount"
          type="number"
          step="0.01"
          {...register("cashAmount", {
            valueAsNumber: true,
            required: "Cash Amount is required",
            min: {
              value: 0.01,
              message: "Cash Amount must be at least 0.01!",
            },
          })}
          error={Boolean(cashAmountError)}
        />
      </FormGroup>

      <Button type="submit">Save</Button>
    </Form>
  );
}
