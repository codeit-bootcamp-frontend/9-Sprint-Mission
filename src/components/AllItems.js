function AllItems({data}) {
    return (
        <div className="item-container">
        {
          data.list.map((item)=>{
            return(
              <div key={item.id}> 
                <img src={item.images}/>
                <div className="item-detail">
                  <p> {item.name}</p>
                  <p className="item-price">{item.price}원 </p>
                  <p className="item-like"> 🤍 {item.favoriteCount}</p>
                  </div>
              </div>
            )
          })
        }
        </div>
    )  
}

export default AllItems