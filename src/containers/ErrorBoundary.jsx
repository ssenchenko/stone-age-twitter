import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import logger from '../services/logger';

const ErrorMessageStyled = styled.h1`
  color: #ef45ae;
  font-weight: bold;

  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      message: error.message,
    };
  }

  componentDidCatch(error, info) {
    logger.error(error, info);
  }

  render() {
    const { hasError, message } = this.state;
    if (hasError) {
      return (
        <ErrorMessageStyled>
          Something went wrong.
          <br />
          {message}
        </ErrorMessageStyled>
      );
    }
    const { children } = this.props;
    return children;
  }
}

export default ErrorBoundary;
