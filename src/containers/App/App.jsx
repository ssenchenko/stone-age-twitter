import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import DefaultTheme from '../../settings/themes';
import LandingPage from '../screens/Landing/Page';
import * as routes from '../../settings/routes';

export const GlobalSettings = styled.div`
  font-family: ${({ theme }) => (theme.general.fontFamily)};
  font-size: ${({ theme }) => (theme.general.fontSize)};
  line-height: ${({ theme }) => (theme.general.lineHeight)};
  color: ${({ theme }) => (theme.general.color)};
  background: ${({ theme }) => (theme.general.background)};
`;

const Root = () => (
  <ThemeProvider theme={DefaultTheme}>
    <Router>
      <GlobalSettings>
        <Route
          exact
          path={routes.LANDING}
          component={LandingPage}
        />
      </GlobalSettings>
    </Router>
  </ThemeProvider>
);

export default Root;
