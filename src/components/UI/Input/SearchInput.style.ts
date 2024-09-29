import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  width: 1054px;
  background-color: yellow;
  border-radius: 12px;
`;

const Input = styled.input`
  flex: 1;
  height: 42px;
  padding: 9px 20px;
  padding-left: 44px;
  background-color: #f3f4f6;
  font-size: 16px;
  font-weight: 400;
  color: #9ca3af;
  border: transparent;
  border-radius: 12px;

  ::placeholder {
    color: #9ca3af;
  }
`;

const ImageWrap = styled.div`
  position: absolute;
  left: 12px;
`;

const S = {
  Container,
  Input,
  ImageWrap,
};

export default S;
