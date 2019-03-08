import React, { useContext } from 'react';
import styled from 'styled-components';

import SessionContext from '../../services/session';
import PostForm from '../PostForm';

const PageContainerStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const LandingPage = () => {
  const authUser = useContext(SessionContext);

  return (
    <PageContainerStyled>
      {authUser && <PostForm />}
      <p>Hello World!</p>
    </PageContainerStyled>
  );
};

export default LandingPage;
