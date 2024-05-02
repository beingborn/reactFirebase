import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";



function Detail(props){

// useEffect 는 html이 모두 렌더링 된 후 실행
let [탭, 탭변경] = useState(0)

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

  <Nav variant="tabs"  defaultActiveKey="link0">
    <Nav.Item>
      <Nav.Link onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link onClick={()=>{ 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
    </Nav.Item>
</Nav>
<TabContent 탭={탭}/>


</div> 
)
}

function TabContent(props){
  if (props.탭 === 0){
    return <div>내용0</div>
  }
  if (props.탭 === 1){
    return <div>내용1</div>
  }
  if (props.탭 === 2){
    return <div>내용2</div>
  }
}

export default Detail

