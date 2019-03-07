import React, { useContext } from 'react';

import SessionContext from '../../services/session';

const LandingPage = () => {
  const authUser = useContext(SessionContext);

  return (
    <div>
      {authUser && <p>You are logged</p>}
      <p>Hello World!</p>
    </div>
  );
};

export default LandingPage;
