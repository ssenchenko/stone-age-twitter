import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import DefaultTheme from '../settings/themes';
import firebaseApp, { FirebaseContext } from '../services/firebase/index';
import Header from './Header';
import LandingPage from './screens/Landing';
import SignUpPage from './screens/SignUp';
import LoginPage from './screens/Login';
import NoMatch from './screens/404';
import * as routes from '../settings/routes';

export const GlobalSettings = styled.div`
  font-family: ${({ theme }) => (theme.fontFamily)};
  font-size: ${({ theme }) => (theme.fontSize)};
  line-height: ${({ theme }) => (theme.lineHeight)};
  color: ${({ theme }) => (theme.color)};
  background: ${({ theme }) => (theme.background)};
`;

const App = () => (
  <ThemeProvider theme={DefaultTheme}>
    <Router>
      <GlobalSettings>
        <FirebaseContext.Provider value={firebaseApp}>
          <Header />
          <Switch>
            <Route exact path={routes.LANDING} component={LandingPage} />
            <Route path={routes.SIGN_UP} component={SignUpPage} />
            <Route path={routes.LOGIN} component={LoginPage} />
            <Route component={NoMatch} />
          </Switch>
        </FirebaseContext.Provider>
      </GlobalSettings>
    </Router>
  </ThemeProvider>
);

export default App;
