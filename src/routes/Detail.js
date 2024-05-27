import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch, useSelector } from "react-redux";

function Detail(props) {
  // useEffect 는 html이 모두 렌더링 된 후 실행
  let dispatch = useDispatch();


  let [탭, 탭변경] = useState(0);

  let [alert, setAlert] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  }, []);

  let [count, setCount] = useState(0);

  let { id } = useParams();
  let findProduct = props.article.find(function (x) {
    return x.id == id;
  });


  // 자꾸 초기화되는 문제가 있다..
  useEffect(()=>{
    
    let watchedItem = localStorage.getItem("watched")
    watchedItem = JSON.parse(watchedItem); //let을 사용안하면 되지않나?
    watchedItem.push(findProduct.id)
    watchedItem = new Set(watchedItem)
    watchedItem = Array.from(watchedItem)
    localStorage.setItem("watched", JSON.stringify(watchedItem)) /// 배열에 업데이트 된 값 추가 




   const body = document.querySelector("body");
   const sub_h = document.querySelector(".sub_h");
   let wh = window.innerHeight;

   //alert(window.innerHeight);

   sub_h.style.height = wh+"px";

   sub_h.style.height = ( wh - (body.scrollHeight - wh) ) + "px";
   sub_h.style.position = "relative"
  }, []) // findProduct가 실행될 때마다 실행

  let browserSee = localStorage.getItem("watched")
  browserSee = JSON.parse(browserSee)

  let [recentSee , recentChange] = useState(browserSee)
  console.log(recentSee)

  return (
    <div className="container sub_h">
      {count}
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      {alert == true ? (
        <div className="alert alert-warning">4초이내 구매시 할인</div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src="https://beingborn.github.io/gitImage/space-1.jpg"
            width="100%"
            height="100%"
          />
        </div>
        <div className="col-md-6">
          <h4>{findProduct.title}</h4>
          <p>{findProduct.content}</p>
          <p>{findProduct.price}원</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({
                  id: 0,
                  name: "White and Black",
                  count: 2,
                })
              );
            }}
          >
            주문하기
          </button>
 
          <Link to="/cart">장바구니 이동</Link>


          <p className="recent-wrap">최근 본 상품
          {
            recentSee.map((a,i)=>{
              return(
              <RecentContent recentSee={recentSee} i={i}></RecentContent>
              )
            })
          }
          </p>  
        </div>
      </div>

      {/* <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(0);
            }}
            eventKey="link0"
          >
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(1);
            }}
            eventKey="link1"
          >
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => {
              탭변경(2);
            }}
            eventKey="link2"
          >
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav> */}
      <TabContent 탭={탭} />
    </div>
  );
}

function TabContent(props) {
  if (props.탭 === 0) {
    return <div>내용0</div>;
  }
  if (props.탭 === 1) {
    return <div>내용1</div>;
  }
  if (props.탭 === 2) {
    return <div>내용2</div>;
  }
}

function RecentContent(props){
  return(
    <div className="recent">

      {/* <p>{props.recentSee}</p> */}
      <img src={ "https://codingapple1.github.io/shop/shoes" + (props.recentSee[props.i]+1) + ".jpg"}width="80px"/>
      <p>{props.recentSee[props.i]}</p>
    </div>
  )
}

export default Detail;
