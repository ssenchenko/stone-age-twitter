import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { FormStyled, FieldsetStyled, FormError } from './SignFormStyled';
import SubmitButton from '../components/SubmitButton';
import CustomInput from '../components/CustomInput';
import * as utils from '../utils';
import FirebaseContext from '../services/firebase';
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

  const firebase = useContext(FirebaseContext);
  const [firebaseException, setFirebaseException] = useState('');
  const handleSubmit = (event) => {
    firebase
      .doCreateUserWithEmailAndPassword(email.value, password.value)
      .then(() => {
        setFirebaseException('');
        history.push(routes.LANDING);
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
    <FormStyled onSubmit={handleSubmit}>
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
        <SubmitButton disabled={!isAllInputValid} />
      </FieldsetStyled>
    </FormStyled>
  );
};

SignUpFormBase.propTypes = {
  history: ReactRouterPropTypes.history.isRequired,
};

const SignUpForm = withRouter(SignUpFormBase);

export default SignUpForm;
export { SignUpFormBase };