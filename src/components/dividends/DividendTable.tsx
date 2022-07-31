import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { ThemeProps } from '../../assets/styles/themes';
import { Dividend } from '../../types/dividends.type';
import { formatDate } from '../../utils/dateUtils';
import editButton from '../../assets/icons/edit.png';
import deleteButton from '../../assets/icons/delete.png';

const Table = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
  margin-bottom: 24px;

  thead {
    background: ${({ theme }: ThemeProps) => theme.colors.primary.dark};
    color: white;

    tr {
      th {
        padding: 4px;
      }

      th:first-of-type {
        border-top-left-radius: 4px;
      }

      th:last-of-type {
        border-top-right-radius: 4px;
      }
    }
  }

  tbody {
    td {
      padding: 8px;
      border: 1px solid #e4e4e4;
    }

    tr {
      background: ${({ theme }: ThemeProps) => theme.colors.lightBackground};

      &:nth-child(even) {
        background-color: #e8e8e8;
      }
    }
  }

  td {
    text-align: center;
  }
`;

const ActionIcon = styled.img`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

type Props = {
  dividends: Dividend[];
  onDelete?: (id: string) => void;
};

export default function DividendTable({ dividends, onDelete }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th>Stock</th>
          <th>Payment Date</th>
          <th>Cash Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {dividends.map(dividend => (
          <tr key={dividend.id}>
            <td title={dividend.stock?.name}>{dividend.stock?.ticker}</td>
            <td>{formatDate(dividend.paymentDate)}</td>
            <td>{`${dividend.currency} ${dividend.cashAmount}`}</td>
            <td>
              <Link to={`/dividends/edit/${dividend.id}`}>
                <ActionIcon src={editButton} title='Edit dividend' />
              </Link>
              {onDelete && (
                <button onClick={() => onDelete(dividend.id)}>
                  <ActionIcon src={deleteButton} title='Delete dividend' />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
