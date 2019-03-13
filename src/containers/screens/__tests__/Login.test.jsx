import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import LoginPage from '../Login';
import DefaultTheme from '../../../settings/themes';

test('Landing Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <ThemeProvider theme={DefaultTheme}>
        <LoginPage />
      </ThemeProvider>
    </MemoryRouter>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
