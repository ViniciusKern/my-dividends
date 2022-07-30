import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Button from '../../common/Button';
import FormGroup from '../../common/FormGroup';
import Input from '../../common/Input';
import Select from '../../common/Select';
import StockCategoryService from '../../../firebase/services/StockCategoryService';
import { Stock, StockCategory } from '../../../types/stocks.types';
import { Form, LogoPreview } from './styles';
import useFetch from '../../../hooks/useFetch';
import ContainerWithLoading from '../../common/ContainerWithLoading';
import SubHeader from '../../common/SubHeader';

export type OnSubmitParams = {
  id: string;
  name: string;
  ticker: string;
  category: string;
  logo: string | File;
};

type Props = {
  stock?: Stock;
  onSubmit: (params: OnSubmitParams) => Promise<void>;
};

type Inputs = {
  name: string;
  ticker: string;
  category: string;
};

export default function StockForm({ stock, onSubmit }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logoImage, setLogoImage] = useState<string | File>(stock?.logo ?? '');

  const { data: categories, status: categoriesStatus } = useFetch<StockCategory[]>(
    StockCategoryService.list()
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Inputs>({
    mode: 'onBlur',
    defaultValues: { name: stock?.name, ticker: stock?.ticker },
  });

  const onSubmitFormValues: SubmitHandler<Inputs> = async ({ name, ticker, category }: Inputs) => {
    if (!isSubmitting) {
      setIsSubmitting(true);

      onSubmit({ id: stock?.id ?? '', name, ticker, category, logo: logoImage }).finally(() => {
        setIsSubmitting(false);
      });
    }
  };

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setLogoImage(e.target.files?.[0] ?? '');
  }

  const nameError = errors.name?.message;
  const tickerError = errors.ticker?.message;

  return (
    <ContainerWithLoading isLoading={isSubmitting}>
      <SubHeader title={stock ? 'Edit stock' : 'New stock'} />
      <Form onSubmit={handleSubmit(onSubmitFormValues)}>
        <FormGroup label={{ id: 'name', description: 'Name' }} error={nameError}>
          <Input
            id='name'
            {...register('name', {
              required: 'Name is required',
            })}
            error={Boolean(nameError)}
          />
        </FormGroup>
        <FormGroup label={{ id: 'ticker', description: 'Ticker' }} error={tickerError}>
          <Input
            id='ticker'
            maxLength={6}
            style={{ textTransform: 'uppercase' }}
            {...register('ticker', {
              required: 'Ticker is required',
            })}
            error={Boolean(tickerError)}
          />
        </FormGroup>

        <Controller
          control={control}
          name='category'
          defaultValue={stock?.category?.id}
          rules={{ required: 'Category is required' }}
          render={({ field, fieldState: { error } }) => (
            <FormGroup
              label={{ id: 'category', description: 'Category' }}
              isLoading={categoriesStatus === 'loading'}
              error={error?.message}
            >
              <Select {...field} error={Boolean(error?.message)}>
                <option value={''}>Select a category</option>
                {categories?.map(category => (
                  <option key={category.id} value={category.id}>
                    {`${category.emoji} ${category.name}`}
                  </option>
                ))}
              </Select>
            </FormGroup>
          )}
        />

        <FormGroup label={{ id: 'logo', description: 'Logo' }}>
          <Input
            id='logo'
            type='file'
            accept='image/png, image/jpeg'
            onChange={handleImageChange}
          />
          {logoImage && (
            <LogoPreview
              src={logoImage instanceof File ? URL.createObjectURL(logoImage) : logoImage}
              alt='Stock logo'
            />
          )}
        </FormGroup>

        <Button type='submit'>{stock ? 'Save' : 'Create'}</Button>
      </Form>
    </ContainerWithLoading>
  );
}
