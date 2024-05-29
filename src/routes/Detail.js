// 해야할 것 지금은 정적이니 useState 배열 만들어놓고 submit 시 업로드

import { useEffect, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch, useSelector } from "react-redux";
import TodoTemplate from "../ui/comment";
import styled from "styled-components";

const DetailTitle = styled.h4`
  font-size : 32px;
  font-weight : 700;
  margin-bottom : 32px;
  padding-bottom : 16px;
  border-bottom : 1px solid lightgray;  
  display: flex;
  justify-content : space-between;
`


const LikeBook = styled.span`
  font-size : 20px;
`

function Detail(props) {
  // useEffect 는 html이 모두 렌더링 된 후 실행
  let dispatch = useDispatch();
  let navigate = useNavigate()


  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/detail/${id}`) {
      document.querySelector('.main-bg').style.opacity = "0.5";

      // Clean-up 함수
      return () => {
        document.querySelector('.main-bg').style.opacity = "1"; // 초기화
      };
    }
  }, [location.pathname]); // location.pathname이 변경될 때마다 useEffect가 실행됩니다.



  let [탭, 탭변경] = useState(0);

  // let [alert, setAlert] = useState(true);
  // useEffect(() => {
  //   setTimeout(() => {
  //     setAlert(false);
  //   }, 4000);
  // }, []);



  let { id } = useParams();
  let findProduct = props.article.find(function (x) {
    return x.id == id;
  });







  // top: "0px", width: "1024px", backgroundColor: "#111111", boxShadow: "rgba(0,0,0,0.3)", padding:"32px 32px 20px 32px" , borderRadius:"50px",
  
  

  // 자꾸 초기화되는 문제가 있다..
  useEffect(() => {
    let watchedItem = localStorage.getItem("watched");
    watchedItem = JSON.parse(watchedItem); //let을 사용안하면 되지않나?
    watchedItem.push(findProduct.id);
    watchedItem = new Set(watchedItem);
    watchedItem = Array.from(watchedItem);
    localStorage.setItem("watched", JSON.stringify(watchedItem)); /// 배열에 업데이트 된 값 추가

    const body = document.querySelector("body");
    const sub_h = document.querySelector(".sub_h");
    let wh = window.innerHeight;

    //alert(window.innerHeight);

    // sub_h.style.height = wh + "px";
    // sub_h.style.height = wh - (body.scrollHeight - wh) + "px";

    // sub_h.style.height = wh - (body.scrollHeight - wh) + "px";
    sub_h.style.position = "relative";




  }, []); // findProduct가 실행될 때마다 실행

  let browserSee = localStorage.getItem("watched");
  browserSee = JSON.parse(browserSee);

  let [recentSee, recentChange] = useState(browserSee);
  
  let [count, setCount] = useState(findProduct.like)
  let [countClick, setClick] = useState(1)
  let [bookClick, setBook] = useState(true)

  let addLike = () => {
    let heartSrc = document.querySelector('.heart-svg')
    setClick(countClick + 1)  

    if (countClick % 2 == 1) { 
    setCount (count + 1);
    heartSrc.classList.add('heart-on')

    }  else if (countClick % 2 == 0) {
    setCount (count - 1);
    heartSrc.classList.remove('heart-on')
    }
  }

  
      // 컨펌 true를 누를 시
      // store.js에 addItem()함수로 해당 findProduct id, content, 저자 전송하기
      // 리디렉션 자동으로 시켜주기
      // 컨펌 false를 누를 시 return; 시켜주어서 classList.remove 해주기

  let addBook = () => {
    let bookSrc = document.querySelector('.book-svg')
    if (bookClick == true) {
      bookSrc.classList.add('book-on');
      if (window.confirm("북마크 저장 완료! 해당 페이지로 이동하시겠습니까?")){
        navigate("/cart")
        dispatch(
           addItem({ id: findProduct.id , title : findProduct.title, like: findProduct.like, author : findProduct.author})
        );
      } else {
        dispatch(
          addItem({ id: findProduct.id , title : findProduct.title, like: findProduct.like, author : findProduct.author})
       );
       return  
      }



      setBook(false)
    } else {
      bookSrc.classList.remove('book-on')
      setBook(true)
    }
  }

  const detailBox = {
    border: "2px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.4)",
    borderRadius: "10px",
    zIndex: "2",
    backdropFilter: "blur(5px)",
    webkitBackdropFilter: "blur(5px)",
    border: "2px solid rgba(0,0,0,0.2)",
    background: "rgba(0,0,0,0.4)",
    width: "100%",
    top: "0px",
    padding: "32px 32px 20px 32px",
    boxShadow : "rgba(0,0,0,0.3)"   
}

    // overflow: "hidden",


  // 북마크 기능 .. cartItem처럼 하면 될 것 같은데

  return (
    <div className="container sub_h detail-b" style={detailBox}>

          <p>{findProduct.date}일 발행 <span style={{fontSize: "15px", color : "lightgray", paddingLeft : "8px"}}>{findProduct.author}</span></p>

      <DetailTitle>
        {findProduct.title}
        {/* dispatch가 store에 addItem 해주는 거인듯. addItem id에 findProduct 값들 전달해주면 될듯 그리고 값을 좀 줄여놓고 */}
        {/* {dispatch( addItem({ id: 0, name: "White and Black", count: 2,}));} */}
        <div>
          <button className="book" onClick={addBook}>
            북마크
            <span className="book-svg"></span>
          </button>  
          <button className="heartDetail"
           onClick={addLike}
            
            >{count}
          <span className="heart-svg"></span>  
          </button>
            
        </div>

      </DetailTitle>
      <div className="row">

        <div className="col-md-8">
          <p>
            {/* {findProduct.content} */}
            {
              findProduct.content.split('\n').map(line=>{
                return (<span>{line}<br/></span>)
              })
            }
          </p>
          <p style={{fontSize: "14px", color: "gray"}}>출처 : {findProduct.source}</p>
          <p className="recent-wrap">
            <span className="recent-title">최근 본 상품</span>
            {recentSee.map((a, i) => {
              return (
                <RecentContent recentSee={recentSee} i={i}></RecentContent>
              );
            })}
          </p>
        </div>

        <div className="col-md-4">
          <img src={`https://beingborn.github.io/gitImage/space-${findProduct.id + 1}.jpg`} width="100%" height="100%"/>
        </div>







        <div className="template-wrap">
          {/* <h4>댓글 <span style={{fontSize: "1.2em", color: "gray",paddingLeft: "4px",}}>3</span></h4> */}
          <TodoTemplate></TodoTemplate>
        </div>

      </div>
    </div>
  );
}

// 


function RecentContent(props) {
  return (
      <div className="recent-bx">
        <div className="recent">
          {/* <p>{props.recentSee}</p> */}
          <img
            src={
              "https://beingborn.github.io/gitImage/space-" +
              (props.recentSee[props.i] + 1) +
              ".jpg"
            }
            width="100%"
          />
        </div>
        <p>{props.recentSee[props.i]}</p>
      </div>
    
  );
}

export default Detail;

