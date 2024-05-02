import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Detail(props){

// useEffect 는 html이 모두 렌더링 된 후 실행


let [alert, setAlert] = useState(true)
useEffect(()=>{
  setTimeout(()=>{ setAlert(false) }, 4000)
}, [])

  let [count, setCount] = useState(0);

  let {id} = useParams();
  let findProduct = props.article.find(function(x){
    return x.id == id
  });

  return(
  <div className="container">
    {count}
    <button onClick={()=>{setCount( count + 1 )}}>버튼</button>
    {
    alert == true
    ? <div className="alert alert-warning">
        4초이내 구매시 할인
      </div>
    : null
  }
  <div className="row">
    <div className="col-md-6">
      <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
    </div>
    <div className="col-md-6">
      <h4 className="pt-5">{findProduct.title}</h4>
      <p>{findProduct.content}</p>
      <p>{findProduct.price}원</p>
      <button className="btn btn-danger">주문하기</button> 
    </div>
  </div>
</div> 
)
}

export default Detail
