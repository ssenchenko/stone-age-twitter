import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import { HeaderBase } from '../Header';
import DefaultTheme from '../../settings/themes';

const historyMock = { push: jest.fn() };

describe('HeaderBase', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <HeaderBase history={historyMock} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
