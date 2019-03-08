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

const LoggedNavBar = ({ visible, onSignOutClick, userName }) => {
  const display = visible ? 'flex' : 'none';
  return (
    <NavBarStyled display={display}>
      <h2>
        Hello,&nbsp;
        {userName}
      </h2>
      <NavButton name="SignOut" onClickFunc={onSignOutClick} />
    </NavBarStyled>
  );
};

LoggedNavBar.propTypes = {
  visible: PropTypes.bool,
  onSignOutClick: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired,
};

LoggedNavBar.defaultProps = {
  visible: false,
};

export default LoggedNavBar;
