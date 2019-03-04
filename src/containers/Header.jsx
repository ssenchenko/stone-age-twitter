import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Logo from '../components/Logo';

const HeaderStyled = styled.header`
  position: sticky;
  height: auto /*???*/;
  border-block-end: thin solid #eaf9f1;

  display: flex;
  flex-flow: row wrap;
  align-content: space-around;
`;

const Header = ({ children }) => (
  <HeaderStyled>
    <Logo />
    {children}
  </HeaderStyled>
);

Header.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

Header.defaultProps = {
  children: null,
};

export default Header;
