import ReactDOM from 'react-dom';
import styled from 'styled-components';

import Spinner from './Spinner/Spinner';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(246, 245, 252, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

type Props = {
  isLoading: boolean;
};

export default function Loader({ isLoading }: Props) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <Spinner size={90} />
    </Overlay>,
    document.getElementById('loader-root') as HTMLElement
  );
}
