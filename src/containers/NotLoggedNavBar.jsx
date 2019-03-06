import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import NavButton from '../components/NavButton';

const NavBarStyled = styled.div`
  display: ${({ display }) => (display)};

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: center;

  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NotLoggedNavBar = ({ visible, onSignUpClick, onLoginClick }) => {
  const display = visible ? 'flex' : 'none';
  return (
    <NavBarStyled display={display}>
      <NavButton name="Login" onClickFunc={onLoginClick} />
      <NavButton name="Sign Up" onClickFunc={onSignUpClick} />
    </NavBarStyled>
  );
};

NotLoggedNavBar.propTypes = {
  visible: PropTypes.bool,
  onSignUpClick: PropTypes.func.isRequired,
  onLoginClick: PropTypes.func.isRequired,
};

NotLoggedNavBar.defaultProps = {
  visible: false,
};

export default NotLoggedNavBar;
