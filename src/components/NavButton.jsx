import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonStyled = styled.button`
  border: none;
  outline: none;
  background: #ffffff;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  &:hover {
    color: ${({ theme }) => (theme.activeColor)};
  }
`;

const NavButton = ({ name, onClickFunc }) => (
  <ButtonStyled onClick={onClickFunc}>{name}</ButtonStyled>
);

NavButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClickFunc: PropTypes.func.isRequired,
};

export default NavButton;
