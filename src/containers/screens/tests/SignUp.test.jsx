import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import SignUpPage from '../SignUp';
import DefaultTheme from '../../../settings/themes';

test('Landing Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Router>
      <ThemeProvider theme={DefaultTheme}>
        <SignUpPage />
      </ThemeProvider>
    </Router>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
