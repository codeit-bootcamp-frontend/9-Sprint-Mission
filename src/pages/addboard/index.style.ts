import { styled } from "styled-components";
import { Button } from "@/styles/CommonStyles";

const Container = styled.div`
  max-width: 1200px;
  margin: 90px auto;
  padding: 0 100px;
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 700;
  &:first-child {
    font-size: 20px;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubmitButton = styled(Button)``;

const TitleSection = styled.div`
  margin-top: 32px;
`;

const ContentInput = styled.input`
  width: 100%;
  height: 56px;
  margin-top: 12px;
  padding: 16px 24px;
  background-color: var(--gray-100);
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
`;

const ContentSection = styled.div`
  margin-top: 24px;
`;

const ContentTextArea = styled.textarea`
  width: 100%;
  height: 282px;
  margin-top: 12px;
  padding: 16px 24px;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
  background-color: var(--gray-100);
  border: 1px solid transparent;
  border-radius: 12px;
  resize: none;
`;

const ImageSection = styled.div`
  margin-top: 24px;
  width: 282px;
  height: 320px;

  & > input {
    margin-top: 12px;
  }
`;

const FileInput = styled.input`
  width: 282px;
  height: 282px;
  
`;

const S = {
  Container,
  Title,
  ButtonSection,
  SubmitButton,
  TitleSection,
  ContentInput,
  ContentSection,
  ContentTextArea,
  ImageSection,
};

export default S;
