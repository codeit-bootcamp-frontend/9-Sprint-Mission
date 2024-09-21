import styled from 'styled-components';

const NotContent = styled.div`
  min-height: 100vh;
  height: 100%;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
  padding: 5rem 0;
`;

const Notfound = () => {
  return <NotContent>잘못된 페이지입니다. 🙅‍♀️</NotContent>;
};

export default Notfound;
