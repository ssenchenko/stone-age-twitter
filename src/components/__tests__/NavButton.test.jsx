import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeProvider } from 'styled-components';

import DefaultTheme from '../../settings/themes';
import NavButton from '../NavButton';

const onClick = jest.fn();

describe('NavButton', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ThemeProvider theme={DefaultTheme}>
          <NavButton name="Test" onClickFunc={onClick} />
        </ThemeProvider>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
