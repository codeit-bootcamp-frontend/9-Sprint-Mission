function BestItems({favoriteData}) {
    return(
        <div className="container">
        <p className="best-title"> 베스트상품</p>
      <div className="best-container">
          {
            favoriteData.list.map((item)=>{
              return(
                <div key={item.id}> 
                  <img src={item.images}/>
                </div>
              )
            })
          }
      </div>
    </div>
    )
}

export default BestItems