import PropTypes from 'prop-types';

import styled from 'styled-components';

const SubmitButton = styled.input.attrs({
  type: 'submit',
})`
  display: inline-block;
  padding: 8px;
  margin: 10px 0;
  width: 70%;

  outline: none;
  background: lightgray;

  text-align: center;
  text-decoration: none;
  font-size: 16px;
`;

SubmitButton.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
};

SubmitButton.defaultProps = {
  type: 'submit',
  value: 'Submit',
};

export default SubmitButton;
