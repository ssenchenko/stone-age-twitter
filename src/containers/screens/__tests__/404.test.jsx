import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import NoMatch from '../404';
import DefaultTheme from '../../../settings/themes';

test('Landing Page renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <MemoryRouter initialEntries={['/unknown']}>
      <ThemeProvider theme={DefaultTheme}>
        <Route component={NoMatch} />
      </ThemeProvider>
    </MemoryRouter>, div,
  );
  ReactDOM.unmountComponentAtNode(div);
});
