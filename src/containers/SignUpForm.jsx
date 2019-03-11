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


const SignUpFormBase = ({ history }) => {
  const [userName, setUserName] = useState(utils.initialInputState);
  const handleUserNameChange = (target) => {
    utils.handleInputChange(target, setUserName, 'Invalid symbols in User name');
  };

  const [email, setEmail] = useState(utils.initialInputState);
  const handleEmailChange = (target) => {
    utils.handleInputChange(target, setEmail, "Doesn't look like valid email");
  };

  const [password, setPassword] = useState(utils.initialInputState);
  const [passwVerify, setPasswVerify] = useState(utils.initialInputState);
  const handlePasswordChange = (target) => {
    utils.handleInputChange(target, setPassword, 'Bad choice for password');
    setPasswVerify((prevState) => {
      const isValid = prevState.valid && (prevState.value === target.value);
      const updatedState = {
        valid: isValid,
        errorMessage: isValid ? '' : "Doesn't match your password",
      };
      return { ...prevState, ...updatedState };
    });
  };
  const handlePasswVerifyChange = (target) => {
    utils.handleInputChange(
      target,
      setPasswVerify,
      "Doesn't match your password",
      value => (value === password.value),
    );
  };

  const isAllInputValid = userName.valid && email.valid && password.valid && passwVerify.valid;

  const [firebaseException, setFirebaseException] = useState('');
  const handleSubmit = (event) => {
    firebaseApp
      .doCreateUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        // TODO: impose username uniqueness
        setFirebaseException('');
        firebaseApp
          .doUpdateUserProfile({ displayName: userName.value })
          .then(() => {
            history.push(routes.LANDING);
          })
          .catch((error) => {
            setFirebaseException(error.message);
          });
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/weak-password':
            setPassword((prevState) => {
              const updatedState = {
                valid: false,
                errorMessage: error.message,
              };
              return { ...prevState, ...updatedState };
            });
            break;
          case 'auth/invalid-email':
          case 'auth/email-already-in-use':
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
        <ButtonHolderStyled>
          <SubmitButton disabled={!isAllInputValid} />
        </ButtonHolderStyled>
      </FieldsetStyled>
    </FormCenteredStyled>
  );
};

SignUpFormBase.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpForm;
export { SignUpFormBase };
