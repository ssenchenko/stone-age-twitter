import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import LoginPage from '../Login';
import DefaultTheme from '../../../settings/themes';

test('Landing Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <LoginPage />
      </ThemeProvider>
    </Router>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
