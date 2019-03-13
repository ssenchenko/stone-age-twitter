import React, { useContext } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Logo from '../components/Logo';
import NotLoggedNavBar from './NotLoggedNavBar';
import LoggedNavBar from './LoggedNavBar';
import ErrorBoundary from './ErrorBoundary';
import * as routes from '../settings/routes';
import SessionContext from '../services/session';
import firebaseApp from '../services/firebase';

const HeaderStyled = styled.header`
  position: sticky;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;

  font-weight: 600;
  border-block-end: thin solid lightgreen;
  margin-bottom: 10px;
`;

const LogoWrapper = styled.div`
  order: 1{/*1st in the flexbox*/};
  flex: 1{/*flex-grow = 1*/};
`;

const PlaceHolder = styled.div`
  order: 2;
  flex: 2{/*flex-grow = 2*/};
`;

const NavBar = styled.div`
  order: 3;
  flex: 1{/*flex-grow = 1*/};
`;

const HeaderBase = ({ history, location }) => {
  const authUser = useContext(SessionContext);

  const goToLogin = () => {
    history.push(routes.LOGIN);
  };
  const goToSignUp = () => {
    history.push(routes.SIGN_UP);
  };
  const onSignOut = async () => {
    await firebaseApp.doSignOut();
  };

  const showNavBar = (location.pathname === routes.LANDING);

  return (
    <HeaderStyled>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <PlaceHolder />
      {showNavBar && (
        <NavBar>
          <ErrorBoundary>
            {authUser
              ? <LoggedNavBar visible onSignOutClick={onSignOut} userName={authUser.displayName} />
              : <NotLoggedNavBar visible onLoginClick={goToLogin} onSignUpClick={goToSignUp} />
            }
          </ErrorBoundary>
        </NavBar>
      )}
    </HeaderStyled>
  );
};

HeaderBase.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
  location: ReactRouterPropTypes.location.isRequired,
};

const Header = withRouter(HeaderBase);

export default Header;
export { HeaderBase };
