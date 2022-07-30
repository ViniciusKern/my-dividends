import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Stock } from '../../types/stocks.types';
import editButton from '../../assets/icons/edit.png';
import placeholder from '../../assets/images/placeholder.png';

const Card = styled.div`
  width: 200px;
  min-height: 160px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  padding: 16px;
  border: 2px solid rgb(219, 226, 235);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  img {
    max-width: 160px;
  }

  strong {
    font-size: 32px;
  }

  .name {
    font-size: 16px;
  }

  .category {
    font-size: 12px;
  }
`;

type Props = {
  stock: Stock;
  editable?: boolean;
  onClick?: (stock: Stock) => void;
};

export default function StockCard({ stock, editable, onClick }: Props) {
  return (
    <Card onClick={() => onClick?.(stock)} style={{ cursor: onClick ? 'pointer' : 'auto' }}>
      <section className='content'>
        <img src={stock.logo ?? placeholder} />
        <strong>{stock.ticker}</strong>
        <p className='name'>{stock.name}</p>
        <p className='category'>{`${stock.category?.emoji} ${stock.category?.name}`}</p>
      </section>
      {editable && (
        <Link to={`/stocks/edit/${stock.id}`} className='link'>
          <span>
            <img src={editButton} /> Edit
          </span>
        </Link>
      )}
    </Card>
  );
}
