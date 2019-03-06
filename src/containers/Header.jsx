import React from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import Logo from '../components/Logo';
import NotLoggedNavBar from './NotLoggedNavBar';
import ErrorBoundary from './ErrorBoundary';
import * as routes from '../settings/routes';

const HeaderStyled = styled.header`
  position: sticky;

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-around;

  font-weight: 600;
  border-block-end: thin solid lightgreen;
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

const HeaderBase = ({ history }) => {
  const goToLogin = () => {
    history.push(routes.LOGIN);
  };

  const goToSignUp = () => {
    history.push(routes.SIGN_UP);
  };

  return (
    <HeaderStyled>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <PlaceHolder />
      <NavBar>
        <ErrorBoundary>
          <NotLoggedNavBar visible onLoginClick={goToLogin} onSignUpClick={goToSignUp} />
        </ErrorBoundary>
      </NavBar>
    </HeaderStyled>
  );
};

HeaderBase.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

const Header = withRouter(HeaderBase);

export default Header;
export { HeaderBase };
