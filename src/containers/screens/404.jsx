import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const NoMatchStyled = styled.h1`
  color: #869982;
  font-weight: bold;
  font-size: xx-large;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PathnameStyled = styled.span`
  color: #8c3d74;
  text-decoration: underline;
`;

const NoMatch = ({ location }) => (
  <NoMatchStyled>
    404: Page
    {' '}
    <PathnameStyled>
      {location.pathname}
    </PathnameStyled>
    {' '}
    cannot be found :(
  </NoMatchStyled>
);

NoMatch.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default NoMatch;
