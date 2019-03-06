import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ErrorMessageStyled = styled.p`
  color: red;
  font-size: 9px;
  margin-top: 2px;
  display: ${({ valid }) => (valid === false ? 'block' : 'none')};
`;

const chooseValue = (param, valueForTrue, valueForFalse, valueForDefault) => {
  switch (param) {
    case true:
      return valueForTrue;
    case false:
      return valueForFalse;
    default:
      return valueForDefault;
  }
};

const InputStyled = styled.input`
  background-color: ${({ valid }) => (chooseValue(valid, 'lightgreen', 'pink', 'inherit'))};
  border-color: ${({ valid }) => (chooseValue(valid, 'darkgreen', 'darkred', 'inherit'))};
  border-width: ${({ required }) => (required ? '2px' : 'inherit')};
`;

const ContainerStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  > * {
    padding: 5px 2px;
    margin: 10px;
  };
`;

const CustomInput = ({
  type, name, value, required, onChangeFunc, valid, errorMessage,
}) => {
  const id = name.replace(/(^\s+|\s+$)/g, '').replace(/\s+/g, '_').toLowerCase();
  const handleChange = event => (
    onChangeFunc(event.target)
  );
  return (
    <ContainerStyled>
      <label htmlFor={id}>
        {name}
        &nbsp;&nbsp;
      </label>
      <InputStyled
        type={type}
        id={id}
        value={value}
        onChange={handleChange}
        required={required}
        valid={valid}
      />
      <ErrorMessageStyled valid={valid}>{errorMessage}</ErrorMessageStyled>
    </ContainerStyled>
  );
};

CustomInput.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  required: PropTypes.bool,
  valid: PropTypes.bool, // can be null || true || false; null works for before validation state
  onChangeFunc: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired,
};

CustomInput.defaultProps = {
  type: 'text',
  required: false,
  valid: null,
};

export default CustomInput;
