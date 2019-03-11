import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostStyled = styled.li`
  border: 1px solid lightgray;
  border-radius: 20px;

  margin: ${({ margin }) => (margin)};

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: baseline;
`;

const PStyled = styled.p`
  margin: ${({ margin }) => (margin)};
`;

const H4Styled = styled.h4`
  margin: ${({ margin }) => (margin)};
`;

const ALinkStyled = styled.a`
  margin: ${({ margin }) => (margin)};
`;

const ArticleName = ({ name, url, margin }) => {
  const articleName = <H4Styled margin={margin}>{name}</H4Styled>;
  return (
    url
      ? <ALinkStyled href={url} margin={margin}>{articleName}</ALinkStyled>
      : <PStyled margin={margin}>{articleName}</PStyled>
  );
};

ArticleName.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  margin: PropTypes.string,
};

ArticleName.defaultProps = {
  url: '',
  margin: '0',
};

const DescriptionStyled = styled.div`
  width: 100%;

  margin: ${({ margin }) => (margin)};

  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const DescriptionText = styled.div`
  margin: ${({ margin }) => (margin)};

  display: flex;
  flex-flow: row wrap;
  align-items: baseline;
`;

const Description = ({ description, margin }) => {
  if (description) {
    return (
      <DescriptionStyled margin={margin}>
        <DescriptionText margin="0">
          <PStyled margin="0">
            about
            {' '}
            {description}
          </PStyled>
        </DescriptionText>
      </DescriptionStyled>
    );
  }
  return '';
};

Description.propTypes = {
  description: PropTypes.string,
  margin: PropTypes.string,
};

Description.defaultProps = {
  description: '',
  margin: '0',
};

const Post = ({
  authorName, articleName, description, url,
}) => {
  console.log(authorName, articleName);
  const innerComponentMargin = '10px 0';
  return (
    <PostStyled margin="0 0 10px 0">
      <H4Styled margin="0">{authorName}</H4Styled>
      <PStyled margin="0">posted</PStyled>
      <ArticleName name={articleName} url={url} margin={innerComponentMargin} />
      <Description description={description} margin={innerComponentMargin} />
    </PostStyled>
  );
};

Post.propTypes = {
  authorName: PropTypes.string.isRequired,
  articleName: PropTypes.string.isRequired,
  description: PropTypes.string,
  url: PropTypes.string,
};

Post.defaultProps = {
  description: '',
  url: '',
};

export default Post;
