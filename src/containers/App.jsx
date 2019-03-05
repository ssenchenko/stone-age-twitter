import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import DefaultTheme from '../settings/themes';
import Header from './Header';
import LandingPage from './screens/Landing';
import SignUpPage from './screens/SignUp';
import LoginPage from './screens/Login';
import NoMatch from './screens/404';
import * as routes from '../settings/routes';

export const GlobalSettings = styled.div`
  font-family: ${({ theme }) => (theme.general.fontFamily)};
  font-size: ${({ theme }) => (theme.general.fontSize)};
  line-height: ${({ theme }) => (theme.general.lineHeight)};
  color: ${({ theme }) => (theme.general.color)};
  background: ${({ theme }) => (theme.general.background)};
`;

const App = () => (
  <ThemeProvider theme={DefaultTheme}>
    <Router>
      <GlobalSettings>
        <Header />
        <Switch>
          <Route exact path={routes.LANDING} component={LandingPage} />
          <Route path={routes.SIGN_UP} component={SignUpPage} />
          <Route path={routes.LOGIN} component={LoginPage} />
          <Route component={NoMatch} />
        </Switch>
      </GlobalSettings>
    </Router>
  </ThemeProvider>
);

export default App;
