import styled from "styled-components";

export const Textarea = styled.textarea`
  height: 282px;
  width: 100%;
  border-radius: 12px;
  border-style: none;
  background-color: #f3f4f6;
  padding: 16px 24px;

  &::placeholder {
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
  }
`;
