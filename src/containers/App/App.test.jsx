import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import { GlobalSettings } from './App';
import DefaultTheme from '../../settings/themes';


describe('Global settings css rules contain', () => {
  let tree;
  const theme = DefaultTheme.general;
  beforeAll(() => {
    tree = renderer.create(<GlobalSettings theme={DefaultTheme} />).toJSON();
  });
  it('font from the default theme', () => {
    expect(tree).toHaveStyleRule('font-family', theme.fontFamily);
    expect(tree).toHaveStyleRule('font-size', theme.fontSize);
  });
  it('colors from the default theme', () => {
    expect(tree).toHaveStyleRule('background', theme.background);
    expect(tree).toHaveStyleRule('color', theme.color);
  });
  it('line height from the default theme', () => {
    expect(tree).toHaveStyleRule('line-height', theme.lineHeight);
  });
});
