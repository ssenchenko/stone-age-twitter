import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Post from '../components/Post';
import { mapToArray } from '../utils';

const FeedStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: ${({ theme }) => (theme.feedWidth)};
  margin: auto;
`;

const Feed = ({ data, onLikeClicked }) => (
  <FeedStyled>
    {data && data.size
      ? mapToArray(data, (key, value) => (
        <Post key={key} {...value} onLikeClicked={onLikeClicked} />))
      : <p>Loading...</p>
    }
  </FeedStyled>
);

Feed.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
  // if PropTypes.mapOf was available, it'd look like
  // data: PropTypes.arrayOf(
  //     key: PropTypes.string,
  //     value: PropTypes.shape({
  //       authorId: PropTypes.string.isRequired,
  //       authorName: PropTypes.string.isRequired,
  //       articleName: PropTypes.string.isRequired,
  //       description: PropTypes.string,
  //       timestamp: PropTypes.instanceOf(Date).isRequired,
  //       url: PropTypes.string, // could've failed to upload
  //       postId: PropTypes.string,
  //       isLiked: PropTypes.bool,
  //     }),
  //   ).isRequired,
  onLikeClicked: PropTypes.func.isRequired,
};

export default Feed;
