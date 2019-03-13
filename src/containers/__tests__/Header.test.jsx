import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import { HeaderBase } from '../Header';
import DefaultTheme from '../../settings/themes';

const historyMock = {
  push: jest.fn(),
};
const locationMock = { push: jest.fn() };

describe('HeaderBase', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <MemoryRouter>
            <HeaderBase history={historyMock} location={locationMock} />
          </MemoryRouter>
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
