import styled from "styled-components";
import xIcon from "../../assets/ic_X.png";

const TagSpan = styled.span`
  display: inline-block;
  width: fit-content;
  height: 36px;
  padding: 6px 12px 6px 16px;
  background-color: #f3f4f6;
  margin: 14px 12px 0 0;
  border-radius: 26px;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
`;

const Xbutton = styled.input`
  background: url(${xIcon}) no-repeat center;
  width: 22px;
  height: 24px;
  border-style: none;
  margin-left: 8px;
`;

const Tag = ({ item, index, handleDeleteTag }) => {
  const handleDelete = (e) => {
    handleDeleteTag(index, e.target.name);
  };

  return (
    <div>
      <TagSpan>
        #{item}
        <Xbutton name="tag" type="button" onClick={handleDelete}></Xbutton>
      </TagSpan>
    </div>
  );
};

export default Tag;
