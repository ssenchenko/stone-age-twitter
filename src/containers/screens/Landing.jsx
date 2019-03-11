import React, { useContext, useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

import SessionContext from '../../services/session';
import PostForm from '../PostForm';
import Feed from '../Feed';
import ErrorBoundary from '../ErrorBoundary';
import firebaseApp from '../../services/firebase';
import logger from '../../services/logger';

const PageContainerStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const LandingPage = () => {
  const authUser = useContext(SessionContext);

  const [posts, updatePosts] = useState([]);

  const handlePostsChange = (fetchedPosts) => {
    console.log('Updating state');
    updatePosts(prevPosts => (
      [...fetchedPosts, ...prevPosts]
    ));
  };

  const numberOfPostsInFeed = 12;
  useLayoutEffect(() => {
    console.log('Did mount/Update');
    const unsubscribe = firebaseApp.doQueryLastPosts(numberOfPostsInFeed)
      .onSnapshot((querySnapshot) => {
        const fetchedPosts = [];
        const changedDocs = querySnapshot.docChanges();
        console.log('# of changed Docs', changedDocs.length);
        if (changedDocs.length > 0) {
          changedDocs.forEach((change) => {
            if (change.type === 'added') {
              console.log('Fetch new changes');
              fetchedPosts.push({ ...change.doc.data(), key: change.doc.id });
            }
          });
          if (fetchedPosts.length > 0) {
            handlePostsChange(fetchedPosts);
          }
        }
      },
      (error) => {
        logger.error(error, '');
      });
    return () => {
      console.log('will unmount');
      unsubscribe();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // without [] it works as an infinite loop

  return (
    <PageContainerStyled>
      {authUser
        && (
        <ErrorBoundary>
          <PostForm />
        </ErrorBoundary>
        )}
      <ErrorBoundary>
        <Feed data={posts} />
      </ErrorBoundary>
    </PageContainerStyled>
  );
};

export default LandingPage;
