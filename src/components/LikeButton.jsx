import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as faSolid from 'styled-icons/fa-solid';

import SessionContext from '../services/session';

const HeartStyled = styled(faSolid.Heart)`
  color: ${({ color }) => (color)};
`;

const ButtonStyled = styled.button`
  background-color: none;
  border: none;
  outline: none;
  width: 2em;
  height: 2em;
  font-size: 18px;
  cursor: pointer;
`;

const LikeButton = ({ title, color, onClickFunc }) => {
  const authUser = useContext(SessionContext);
  return (
    <ButtonStyled type="button" onClick={onClickFunc} disabled={!(authUser)}>
      <HeartStyled color={color} title={title} />
    </ButtonStyled>
  );
};

LikeButton.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onClickFunc: PropTypes.func.isRequired,
};

export default LikeButton;
