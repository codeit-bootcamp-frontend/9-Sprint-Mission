import styled from "styled-components";

const Edit = styled.ul`
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  bottom: -100px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid #D1D5DB;
  z-index: 1;
  background-color: #fff;

  li {
    width: 139px;
    height: 46px;
    padding: 12px 17px 16px 17px;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 26px;
    color:#6B7280;
  }
@media only screen and (max-width: 768px) {
li {
    width: 102px;
    height: 46px;
   
}

`;

function EditBox() {
  return (
    <Edit>
      <li>수정하기</li>
      <li>삭제하기</li>
    </Edit>
  );
}

export default EditBox;
