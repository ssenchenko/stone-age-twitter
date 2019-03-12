import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Post from '../components/Post';

const FeedStyled = styled.div`
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

const Feed = ({ data }) => (
  <FeedStyled>
    {data && data.size
      ? mapToArray(data, (key, value) => (
        <Post key={key} {...value} />))
      : <p>Loading...</p>
    }
  </FeedStyled>
);

Feed.propTypes = {
  data: PropTypes.instanceOf(Map).isRequired,
  // if PropTypes.mapOf was available, it'd be look like
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
  //       onLikeClicked: PropTypes.func,
  //       isLiked: PropTypes.bool,
  //     }),
  //   ).isRequired,
};

export default Feed;
