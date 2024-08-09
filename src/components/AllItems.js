function AllItems({data}) {
    return (
        <div className="item-container">
        {
          data.list.map((item)=>{
            return(
              <div key={item.id}> 
                <img src={item.images}/>
              </div>
            )
          })
        }
        </div>
    )  
}

export default AllItems