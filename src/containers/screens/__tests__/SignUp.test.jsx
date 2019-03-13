import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import SignUpPage from '../SignUp';
import DefaultTheme from '../../../settings/themes';

test('Landing Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter>
      <ThemeProvider theme={DefaultTheme}>
        <SignUpPage />
      </ThemeProvider>
    </MemoryRouter>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
