import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import NotLoggedNavBar from '../NotLoggedNavBar';
import DefaultTheme from '../../settings/themes';

const onClick = jest.fn();

describe('NotLoggedNavBar', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <NotLoggedNavBar visible onSignUpClick={onClick} onLoginClick={onClick} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
