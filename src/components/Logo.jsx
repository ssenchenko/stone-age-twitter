import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import * as routes from '../settings/routes';

const LogoStyled = styled.h1`
  color: darkgreen;
  font-weight: bold;
  font-size: 32px;
`;

const Logo = () => (
  <NavLink
    to={routes.LANDING}
    activeStyle={{
      textDecoration: 'none',
    }}
  >
    <LogoStyled>Test</LogoStyled>
  </NavLink>
);

export default Logo;
