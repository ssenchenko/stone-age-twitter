import React from 'react';

import SignUpForm from '../SignUpForm';
import ErrorBoundary from '../ErrorBoundary';

const SignUpPage = () => (
  <ErrorBoundary>
    <SignUpForm />
  </ErrorBoundary>
);

export default SignUpPage;
