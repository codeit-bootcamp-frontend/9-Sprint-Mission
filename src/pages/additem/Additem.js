import { useState } from "react"
import "./Additem.css"


function Additem() {
    let [addImg, setAddImg] = useState(false)
    let [tag, setTag] = useState('')
    let [tagState, setTagState] = useState(["#티셔츠", "#상의"])
    
    let handleChange = (e) => {
        setTag(e.target.value)
    }
    let handleKeydown = (e) => {
        if (e.key === 'Enter') {
            let copy = [...tagState]
            copy.push("#" + e.target.value)
            setTagState(copy)
        }
    }

    return (
        <div className="container">
            <div className="header">
                <div className="additem">상품 등록하기</div>
                <button className="additem-btn">등록</button>
            </div>
            <div className="main">
                <div className="item-img">
                    <p>상품 이미지</p>
                    <div className="addimg-box">
                        <div className="plus-img" onClick={()=>{
                            setAddImg(true)
                        }}>
                            <img src="/ic_plus.png"></img>
                            <div>이미지 등록</div>
                        </div>
                        {
                            addImg == true ? <div className="show-box"/> : null
                        }
                    </div>
                </div>
                <div className="item-title">
                    <p>상품명</p>
                    <input type="text" placeholder="상품명을 입력해주세요"></input>
                </div>
                <div className="item-content">
                    <p>상품 소개</p>
                    <input type="text" placeholder="상품소개를 입력해주세요" className="input-content"></input>                
                </div>
                <div className="item-price1">
                    <p>판매가격</p>
                    <input type="number" placeholder="판매 가격을 입력해주세요"></input>    
                </div>
                <div className="item-tag">
                    <p>태그</p>
                    <input type="text" placeholder="태그를 입력해주세요" onChange={handleChange} onKeyDown={handleKeydown}/>
                    <div  className="tag-box"> 
                        {
                            tagState.map((item)=>{
                                return (
                                    <p className="add-tag"> {item} </p> 
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Additem