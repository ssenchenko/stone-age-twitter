import React from 'react';

import LoginForm from '../LoginForm';
import ErrorBoundary from '../ErrorBoundary';

const LoginPage = () => (
  <ErrorBoundary>
    <LoginForm />
  </ErrorBoundary>
);

export default LoginPage;
