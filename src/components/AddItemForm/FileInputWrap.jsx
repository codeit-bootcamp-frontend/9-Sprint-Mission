import styled from "styled-components";
import plusIcon from "../../assets/ic_plus.png";

export const AddText = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
`;

export const PlusButton = styled.div`
  width: 48px;
  height: 48px;
  background-image: url(${plusIcon});
`;

export const FileInputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 168px;
  height: 168px;
  border-radius: 12px;
  padding: 42px 47px;
  background-color: #f3f4f6;

  @media (min-width: 1200px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 282px;
    height: 282px;
  }
`;

export const FileInputWrap = styled.div`
  display: flex;
  column-gap: 10px;

  @media (min-width: 1200px) {
    display: flex;
    column-gap: 24px;
  }
`;

export const WarnAlarm = styled.span`
  @media (min-width: 375px) {
    display: none;
  }

  @media (min-width: 768px) {
    display: none;
  }

  @media (min-width: 1200px) {
    display: inline-block;
    margin-top: 16px;
    font-weight: 400;
    font-size: 16px;
    line-height: 26px;
    color: #f74747;
  }
`;
