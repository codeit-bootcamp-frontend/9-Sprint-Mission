const Paging = () => {
  return (
    <footer className="Paging">
      <div className="container">
        <div className="paging-wrap">
          <button type="button" className="left-arrow"></button>
          <button type="button" className="active">
            1
          </button>
          <button type="button">2</button>
          <button type="button">3</button>
          <button type="button">4</button>
          <button type="button">5</button>
          <button type="button" className="right-arrow"></button>
        </div>
      </div>
    </footer>
  );
};

export default Paging;
