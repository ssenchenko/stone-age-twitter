import React, { useState } from 'react';

import { FormStyled, FieldsetStyled } from './SignFormStyled';
import SubmitButton from '../components/SubmitButton';
import CustomInput from '../components/CustomInput';
import * as utils from '../utils';

const SignUpForm = () => {
  const [userName, setUserName] = useState(utils.initialInputState);
  const handleUserNameChange = (target) => {
    utils.handleInputChange(target, setUserName, 'Invalid symbols in User name');
  };

  const [email, setEmail] = useState(utils.initialInputState);
  const handleEmailChange = (target) => {
    utils.handleInputChange(target, setEmail, "Doesn't look like valid email");
  };

  const [password, setPassword] = useState(utils.initialInputState);
  const handlePasswordChange = (target) => {
    utils.handleInputChange(target, setPassword, 'Bad choice for password');
  };

  const [passwVerify, setPasswVerify] = useState(utils.initialInputState);
  const handlePasswVerifyChange = (target) => {
    utils.handleInputChange(
      target,
      setPasswVerify,
      "Doesn't match your password",
      value => (value === password.value),
    );
  };

  return (
    <FormStyled onSubmit={() => (null)}>
      <FieldsetStyled>
        <legend>Please Sign Up</legend>
        <CustomInput
          name="User name"
          value={userName.value}
          onChangeFunc={handleUserNameChange}
          valid={userName.valid}
          errorMessage={userName.errorMessage}
          required
        />
        <CustomInput
          type="email"
          name="email"
          value={email.value}
          onChangeFunc={handleEmailChange}
          valid={email.valid}
          errorMessage={email.errorMessage}
          required
        />
        <CustomInput
          type="password"
          name="Password"
          value={password.value}
          onChangeFunc={handlePasswordChange}
          valid={password.valid}
          errorMessage={password.errorMessage}
          required
        />
        <CustomInput
          type="password"
          name="Password again"
          value={passwVerify.value}
          onChangeFunc={handlePasswVerifyChange}
          valid={passwVerify.valid}
          errorMessage={passwVerify.errorMessage}
          required
        />
        <SubmitButton />
      </FieldsetStyled>
    </FormStyled>
  );
};

export default SignUpForm;
