import "./Pagenation.css";

export function Pagenation({ setPage }) {
  const onClick = (e) => {
    setPage(e.target.id);
    
    const btnEl = document.querySelectorAll('.pagenation-btn');
    btnEl.forEach((btn)=>{
      if(btn.classList.contains('current-page')) btn.classList.remove('current-page')
    })
    e.target.classList.add('current-page')

  }
  return (
    <div className="pagenation-contatiner">
      <button className="pagenation-btn">&lt;</button>
      <button onClick={onClick} id="1" className="pagenation-btn current-page">
        1
      </button>
      <button onClick={onClick} id="2" className="pagenation-btn">
        2
      </button>
      <button onClick={onClick} id="3" className="pagenation-btn">
        3
      </button>
      <button onClick={onClick} id="4" className="pagenation-btn">
        4
      </button>
      <button onClick={onClick} id="5" className="pagenation-btn">
        5
      </button>
      <button className="pagenation-btn">&gt;</button>
    </div>
  );
}
