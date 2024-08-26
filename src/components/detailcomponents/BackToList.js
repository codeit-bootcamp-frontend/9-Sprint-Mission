function BackToList({ navigate }) {
  return (
    <button
      className="link"
      onClick={() => {
        navigate("/items");
      }}
    >
      목록으로 돌아가기
      <img src="/arrow_left.png" alt="뒤로가기이미지" />
    </button>
  );
}

export default BackToList;
