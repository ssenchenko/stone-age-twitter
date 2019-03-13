import React, { useState, useContext } from 'react';
import styled from 'styled-components';

import { FormStyled, ButtonHolderStyled, FormError } from './FormStyled';
import CustomInput from '../components/CustomInput';
import SubmitButton from '../components/SubmitButton';
import firebaseApp from '../services/firebase';
import * as utils from './utils';
import SessionContext from '../services/session';

const FieldSetStyled = styled.fieldset`
  padding: 5px;
  border: 1px solid lightgray;
  border-radius: 20px;
`;

const LegendStyled = styled.legend`
  position: relative;
  margin-left: 30px;
  padding: 5px 10px;
`;

const WithWidthFormStyled = styled(FormStyled)`
  width: ${({ theme }) => (theme.feedWidth)};
  margin: 0 auto 10px auto;
`;

const ContainerStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;

  > * {
    padding: 2px 1px;
    margin: 5px;
  };

  input {
    flex-grow: 2;
  };
`;

const PostForm = () => {
  const [articleName, setArticleName] = useState(utils.initialInputState);
  const handleNameChange = (target) => {
    utils.handleInputChange(target, setArticleName, "Can't be empty");
  };

  const notRequiredInputInitialState = { ...utils.initialInputState, ...{ valid: true } };
  const [articleDescription, setArticleDescription] = useState(notRequiredInputInitialState);
  const handleDescriptionChange = (target) => {
    utils.handleInputChange(target, setArticleDescription, '');
  };

  const fileInputInitialState = { ...utils.initialInputState, ...{ file: null } };
  const [articleFile, setArticleFile] = useState(fileInputInitialState);
  const handleFileChange = (target) => {
    const isValid = target.checkValidity() && (!!target.files[0]);
    const newState = {
      value: target.value,
      valid: isValid,
      errorMessage: isValid ? '' : "Can't be empty",
      file: target.files[0],
    };
    setArticleFile(newState);
  };

  const isAllInputValid = articleName.valid && articleFile.valid && articleDescription.valid;

  const [firebaseException, setFirebaseException] = useState('');
  const authUser = useContext(SessionContext);
  const onSubmit = async (event) => {
    const currentUserId = authUser.uid;
    // let postRef = null;
    // let [url, storageUri] = [null, null];
    firebaseApp
      // 1) save article header
      .doSaveArticleHeader({
        inAuthorId: currentUserId,
        inAuthorName: authUser.displayName,
        inArticleName: articleName.value,
        inDescription: articleDescription.value,
      })
      .then((postRef) => {
        // 2) upload file
        const filePath = `${currentUserId}/${postRef.id}/${articleFile.file.name}`;
        return firebaseApp
          .doUploadFile(filePath, articleFile.file)
          .then(fileSnapshot => (
            fileSnapshot.ref.getDownloadURL()
          )
            // 3) update post with file url
            .then(url => (
              firebaseApp.doCompletePost(postRef, url, fileSnapshot.metadata.fullPath)
            ))); // FIXME: don't create a post if file uploading failed
      })
      .catch((error) => { setFirebaseException(error.message); });
    event.preventDefault();
  };

  return (
    <WithWidthFormStyled onSubmit={onSubmit}>
      {(firebaseException) && <FormError>firebaseException</FormError>}
      <FieldSetStyled>
        <LegendStyled>Post a new article</LegendStyled>
        <CustomInput
          type="text"
          name="Article name"
          value={articleName.value}
          onChangeFunc={handleNameChange}
          valid={articleName.valid}
          errorMessage={articleName.errorMessage}
          required
          Container={ContainerStyled}
        />
        <CustomInput
          type="text"
          name="Description"
          value={articleDescription.value}
          onChangeFunc={handleDescriptionChange}
          valid={articleDescription.valid}
          errorMessage={articleDescription.errorMessage}
          Container={ContainerStyled}
        />
        <CustomInput
          type="file"
          name="Choose article"
          value={articleFile.value}
          onChangeFunc={handleFileChange}
          valid={articleFile.valid}
          errorMessage={articleFile.errorMessage}
          required
          Container={ContainerStyled}
        />
        <ButtonHolderStyled>
          <SubmitButton value="Post" disabled={!isAllInputValid} />
        </ButtonHolderStyled>
      </FieldSetStyled>
    </WithWidthFormStyled>
  );
};

export default PostForm;
