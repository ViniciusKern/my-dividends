import { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import GlobalStyles from '../../assets/styles/global';
import Login from '../../pages/Login/Login';
import AuthContext from '../../contexts/AuthContext';
import AppHeader from '../AppHeader/AppHeader';
import { Container } from './styles';
import Stocks from '../../pages/Stocks/Stocks';
import Loader from '../common/Loader';
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from '../../assets/styles/themes';
import EditStock from '../../pages/Stocks/EditStock';
import NewStock from '../../pages/Stocks/NewStock';
import NotFound from '../../pages/NotFound';
import Dividends from '../../pages/Dividends/Dividends';
import NewDividend from '../../pages/Dividends/NewDividend';
import EditDividend from '../../pages/Dividends/EditDividend';
import ToastContainer from '../common/Toast/ToastContainer';

export default function App() {
  const { loggedUser, isLoading } = useContext(AuthContext);

  let appContent = null;

  if (!isLoading) {
    appContent = loggedUser ? (
      <>
        <BrowserRouter>
          <AppHeader />
          <Routes>
            <Route path='/' element={<Navigate to='/dividends' />} />
            <Route path='dividends'>
              <Route index element={<Dividends />} />
              <Route path='new' element={<NewDividend />} />
              <Route path='edit/:dividendId' element={<EditDividend />} />
            </Route>
            <Route path='stocks'>
              <Route index element={<Stocks />} />
              <Route path='new' element={<NewStock />} />
              <Route path='edit/:stockId' element={<EditStock />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </>
    ) : (
      <Login />
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Container>
        <ToastContainer />
        <Loader isLoading={isLoading} />
        {appContent}
      </Container>
    </ThemeProvider>
  );
}
