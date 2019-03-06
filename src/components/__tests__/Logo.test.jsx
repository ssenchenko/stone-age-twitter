import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import DefaultTheme from '../../settings/themes';
import Logo from '../Logo';

describe('Logo', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <Logo />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
