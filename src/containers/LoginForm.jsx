import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import {
  FormCenteredStyled, FieldsetStyled, FormError, ButtonHolderStyled,
} from './FormStyled';
import SubmitButton from '../components/SubmitButton';
import CustomInput from '../components/CustomInput';
import * as utils from '../utils';
import firebaseApp from '../services/firebase';
import * as routes from '../settings/routes';

// TODO: after 3 unsuccessful logins send email link -- should be done with Cloud functions, not now

const LoginFormBase = ({ history }) => {
  const [email, setEmail] = useState(utils.initialInputState);
  const handleEmailChange = (target) => {
    utils.handleInputChange(target, setEmail, "Doesn't look like valid email");
  };

  const [password, setPassword] = useState(utils.initialInputState);
  const handlePasswordChange = (target) => {
    utils.handleInputChange(target, setPassword, 'Bad choice for password');
  };

  const isAllInputValid = email.valid && password.valid;

  const [firebaseException, setFirebaseException] = useState('');
  const handleSubmit = (event) => {
    firebaseApp
      .doSignInWithEmailAndPassword(email.value, password.value)
      .then(() => {
        setFirebaseException('');
        history.push(routes.LANDING);
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/wrong-password':
            setPassword((prevState) => {
              const updatedState = {
                valid: false,
                errorMessage: error.message,
              };
              return { ...prevState, ...updatedState };
            });
            break;
          case 'auth/invalid-email':
          case 'auth/user-not-found':
            setEmail((prevState) => {
              const updatedState = {
                valid: false,
                errorMessage: error.message,
              };
              return { ...prevState, ...updatedState };
            });
            break;
          default:
            setFirebaseException(error.message);
        }
      });
    event.preventDefault();
  };

  return (
    <FormCenteredStyled onSubmit={handleSubmit}>
      {(firebaseException) && <FormError>firebaseException</FormError>}
      <FieldsetStyled>
        <legend>Please Login</legend>
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
        <ButtonHolderStyled>
          <SubmitButton disabled={!isAllInputValid} />
        </ButtonHolderStyled>
      </FieldsetStyled>
    </FormCenteredStyled>
  );
};

LoginFormBase.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

const SignUpForm = withRouter(LoginFormBase);

export default SignUpForm;
export { LoginFormBase };
