import styled from "styled-components";

export function Tag({ value }) {
  const Hashtag = styled.span`
    display: inline-flex;
    align-items: center;
    height: 36px;
    background-color: #f3f4f6;
    color: #1f2937;
    font-size: 1.6rem;
    line-height: 2.6rem;
    font-weight: 400;
    border-radius: 26px;
    padding: 5px 40px 5px 16px;
    overflow: hidden;
    margin-bottom: 12px;
  `;

  return <Hashtag>#{value}</Hashtag>;
}
