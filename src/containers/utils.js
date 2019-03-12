export const initialInputState = {
  value: '',
  valid: null,
  errorMessage: '',
};

export const handleInputChange = (
  target,
  setStateFunc,
  errorMessage,
  customValidationFunc = () => (true),
) => {
  const isValid = target.checkValidity() && customValidationFunc(target.value);
  const newState = {
    value: target.value,
    valid: isValid,
    errorMessage: isValid ? '' : errorMessage,
  };
  setStateFunc(newState);
};
