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

const Feed = ({ data }) => (
  <FeedStyled>
    {data && data.length
      ? data.map(dataItem => (
        <Post {...dataItem} />))
      : <p>Loading...</p>
    }
  </FeedStyled>
);

Feed.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      authorId: PropTypes.string.isRequired,
      authorName: PropTypes.string.isRequired,
      articleName: PropTypes.string.isRequired,
      description: PropTypes.string,
      timestamp: PropTypes.instanceOf(Date).isRequired,
      url: PropTypes.string, // could've failed to upload
      key: PropTypes.string,
    }),
  ).isRequired,
};

export default Feed;
