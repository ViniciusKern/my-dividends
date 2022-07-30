import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import AuthContext from '../../contexts/AuthContext';
import AuthService from '../../firebase/services/AuthService';
import logoutIcon from '../../assets/icons/logout.png';
import logo from '../../assets/images/logo.png';
import { Header, LogoContainer } from './styles';

export default function AppHeader() {
  const { loggedUser } = useContext(AuthContext);

  function handleLogout() {
    AuthService.logout();
  }

  return (
    <Header>
      <LogoContainer>
        <img src={logo} />
        <h1>My Dividends</h1>
      </LogoContainer>

      <div className='menus'>
        <nav>
          <NavLink
            to='dividends'
            className={({ isActive }) => (isActive ? 'active-link' : undefined)}
          >
            Dividends
          </NavLink>
          <NavLink to='stocks' className={({ isActive }) => (isActive ? 'active-link' : undefined)}>
            Stocks
          </NavLink>
        </nav>

        <div className='user-info'>{loggedUser?.displayName || loggedUser?.email}</div>
        <button title='Log out' className='logout-button' onClick={handleLogout}>
          <img src={logoutIcon} alt='Log out' />
        </button>
      </div>
    </Header>
  );
}
