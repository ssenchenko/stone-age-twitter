import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Post from '../components/Post';

const FeedStyled = styled.div`
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;
  width: ${({ theme }) => (theme.feedWidth)};
  margin: auto;
`;

const mapToArray = (map, callback) => {
  const array = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of map.entries()) {
    array.push(callback(key, value));
  }
  return array;
};

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
