import React, { useContext, useReducer, useLayoutEffect } from 'react';
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

const createModifiedPosts = (originalPosts, postIdToModify, isLiked) => {
  const updatedPosts = new Map(originalPosts);
  const postToUpdate = updatedPosts.get(postIdToModify);
  if (postToUpdate) {
    postToUpdate.isLiked = isLiked;
  }
  return updatedPosts;
};

const postsReducer = (posts, action) => {
  switch (action.type) {
    case 'merge':
      return new Map([...action.newPosts, ...posts]);
    case 'likeOrDislike':
      return createModifiedPosts(posts, action.postId, action.isLiked);
    default:
      throw new Error(`Action type ${action.type} doesn't exist. 
        Possible values are 'merge' and 'likeOrDislike'`);
  }
};

const LandingPage = () => {
  const authUser = useContext(SessionContext);

  const [posts, dispatch] = useReducer(postsReducer, new Map());

  const handlePostsChange = (fetchedPosts) => {
    console.log('Merging new posts');
    dispatch({ type: 'merge', newPosts: fetchedPosts });
  };

  const handleLikeChange = (postId, isLiked) => {
    console.log('Updating likes');
    dispatch({ type: 'likeOrDislike', postId, isLiked });
  };

  const numberOfPostsInFeed = 12;
  // TODO: refactor into useEffect()
  useLayoutEffect(() => {
    console.log('Did mount/Update');
    const unsubscribe = firebaseApp.doQueryLastPosts(numberOfPostsInFeed)
      .onSnapshot((querySnapshot) => {
        const fetchedPosts = new Map();
        const changedDocs = querySnapshot.docChanges();
        console.log('# of changed Docs', changedDocs.length);
        if (changedDocs.length > 0) {
          changedDocs.forEach((change) => {
            if (change.type === 'added') {
              console.log('Fetch new changes');
              fetchedPosts.set(change.doc.id, {
                ...change.doc.data(),
                postId: change.doc.id, // yes, again id, it's convenient. see Feed.jsx why
                isLiked: false,
                onLikeClicked: handleLikeChange,
              });
            }
          });
          if (fetchedPosts.size > 0) {
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
  }, []); // without [] it's working here as an infinite loop

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
