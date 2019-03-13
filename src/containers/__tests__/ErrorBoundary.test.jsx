import 'jest-styled-components';
import React from 'react';
import renderer from 'react-test-renderer';

import ErrorBoundary from '../ErrorBoundary';

// no output needed
console.error = jest.fn(); // eslint-disable-line no-console

const Error = () => {
  throw new Error('Error thrown from problem child');
};

describe('ErrorBoundary', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <ErrorBoundary>
          <Error />
        </ErrorBoundary>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
