import styled from 'styled-components';

export const FormStyled = styled.div`
  display: flex;
  flex-flow: column nowrap;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonHolderStyled = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
`;

export const FieldsetStyled = styled.fieldset`
  padding: 15px;
`;
