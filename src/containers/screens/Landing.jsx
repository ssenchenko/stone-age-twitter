import React, {
  useContext, useReducer, useEffect, useMemo,
} from 'react';
import styled from 'styled-components';

import SessionContext from '../../services/session';
import PostForm from '../PostForm';
import Feed from '../Feed';
import ErrorBoundary from '../ErrorBoundary';
import firebaseApp from '../../services/firebase';
import logger from '../../services/logger';
import numberOfPostsToFetch from '../../settings/db';


const PageContainerStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const createModifiedPosts = (originalPosts, likesToFetch) => {
  /*
    likesToFetch = [{
      postId,
      isLiked,
      postLikeId
    }]
  */
  const updatedPosts = new Map(originalPosts);
  if (likesToFetch.length > 0) {
    likesToFetch.forEach((dataItem) => {
      const postToUpdate = updatedPosts.get(dataItem.postId);
      if (typeof postToUpdate !== 'undefined') {
        postToUpdate.isLiked = dataItem.isLiked;
        postToUpdate.postLikeId = dataItem.postLikeId;
      }
    });
  } else { // clear all likes
    updatedPosts.forEach((value, key) => {
      updatedPosts.get(key).isLiked = false;
      updatedPosts.get(key).postLikeId = '';
    });
  }
  return updatedPosts;
};

const postsReducer = (postsState, action) => {
  let updatedPostsState = null;
  let postsHasBeenFetchedOnce = true;
  switch (action.type) {
    case 'MERGE':
      logger.debug('Merging posts');
      postsHasBeenFetchedOnce = true;
      updatedPostsState = {
        posts: new Map([...action.newPosts, ...postsState.posts]),
        postsHasBeenFetchedOnce,
        shouldRefetchLikes: postsState.postsHasBeenFetchedOnce !== postsHasBeenFetchedOnce,
      };
      break;
    case 'REFETCH_LIKES_IF_FETCHED':
      logger.debug('Updating userId');
      updatedPostsState = {
        // if user changes after postsHasBeenFetchedOnce - need to refetch likes
        shouldRefetchLikes: postsState.postsHasBeenFetchedOnce,
      };
      break;
    case 'LIKE_OR_DISLIKE':
      logger.debug('Updating likes');
      updatedPostsState = {
        posts: createModifiedPosts(postsState.posts, action.likesToFetch),
        shouldRefetchLikes: false,
      };
      break;
    default:
      throw new Error(`Action type ${action.type} doesn't exist. 
        Possible values are 'MERGE', 'REFETCH_LIKES_IF_FETCHED', and 'LIKE_OR_DISLIKE'`);
  }
  return { ...postsState, ...updatedPostsState };
};

const LandingPage = () => {
  const initialState = {
    posts: new Map(),
    postsHasBeenFetchedOnce: false,
    shouldRefetchLikes: false,
  };
  const [postsState, dispatch] = useReducer(postsReducer, initialState);

  const authUser = useContext(SessionContext);
  const userId = useMemo(() => {
    dispatch({ type: 'REFETCH_LIKES_IF_FETCHED' });
    return authUser ? authUser.uid : null;
  }, [authUser]);

  // TODO: use Realtime Database for updating likes instead because of pricing policy
  const handleLikeChange = (postId, isLiked) => {
    if (isLiked) {
      logger.debug('Saving like');
      const postTimestamp = postsState.posts.get(postId).timestamp;
      firebaseApp.doLikePost(userId, postId, postTimestamp)
        .then((postLikeRef) => {
          const likesToFetch = [{
            postId,
            isLiked,
            postLikeId: postLikeRef.id,
          }];
          dispatch({ type: 'LIKE_OR_DISLIKE', likesToFetch });
          logger.debug(`Like Written to Firestore ${postLikeRef.id}`);
        })
        .catch((error) => { logger.error(error.message, ''); });
    } else {
      logger.debug('Removing like');
      firebaseApp.doDislikePost(postsState.posts.get(postId).postLikeId)
        .then(() => {
          const likesToFetch = [{
            postId,
            isLiked,
            postLikeId: '',
          }];
          dispatch({ type: 'LIKE_OR_DISLIKE', likesToFetch });
          logger.debug(`Post ${postId} disliked`);
        })
        .catch((error) => { logger.error(error.message, ''); });
    }
  };

  useEffect(() => {
    logger.debug('Query posts');
    const unsubscribe = firebaseApp.doQueryLastPosts(numberOfPostsToFetch)
      .onSnapshot((querySnapshot) => {
        const fetchedPosts = new Map();
        const changedDocs = querySnapshot.docChanges();
        logger.debug('# of changed Docs', changedDocs.length);
        if (changedDocs.length > 0) {
          changedDocs.forEach((change) => {
            if (change.type === 'added') {
              logger.debug('Fetch new changes');
              fetchedPosts.set(change.doc.id, {
                ...change.doc.data(),
                postId: change.doc.id, // yes, again id, it's convenient. see Feed.jsx why
                isLiked: false,
              });
            }
          });
          if (fetchedPosts.size > 0) {
            dispatch({ type: 'MERGE', newPosts: fetchedPosts });
          }
        }
      },
      (error) => {
        logger.error(error, '');
      });
    return () => {
      logger.debug('will unmount');
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    if (postsState.shouldRefetchLikes) {
      logger.debug('Query likes');
      firebaseApp.doQueryLikes(userId, numberOfPostsToFetch)
        .get()
        .then((querySnapshot) => {
          const likesToFetch = [];
          querySnapshot.forEach((doc) => {
            const { postId } = doc.data();
            likesToFetch.push({
              postId,
              isLiked: true,
              postLikeId: doc.id,
            });
          });
          dispatch({ type: 'LIKE_OR_DISLIKE', likesToFetch });
        })
        .catch((error) => { logger.error(error.message, ''); });
    }
  }, [postsState.shouldRefetchLikes, userId]);

  return (
    <PageContainerStyled>
      {authUser
        && (
        <ErrorBoundary>
          <PostForm />
        </ErrorBoundary>
        )}
      <ErrorBoundary>
        <Feed data={postsState.posts} onLikeClicked={handleLikeChange} />
      </ErrorBoundary>
    </PageContainerStyled>
  );
};

export default LandingPage;
