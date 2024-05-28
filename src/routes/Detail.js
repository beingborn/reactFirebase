// 해야할 것 지금은 정적이니 useState 배열 만들어놓고 submit 시 업로드

import { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch, useSelector } from "react-redux";
import TodoTemplate from "../ui/comment";
import styled from "styled-components";

const DetailTitle = styled.h4`
  font-size : 32px;
  font-weight : 700;
  margin-bottom : 48px;  
  display: flex;
  justify-content : space-between;
`



const LikeBook = styled.span`
  font-size : 20px;
`

function Detail(props) {
  // useEffect 는 html이 모두 렌더링 된 후 실행
  let dispatch = useDispatch();

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

  let [alert, setAlert] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 4000);
  }, []);



  let { id } = useParams();
  let findProduct = props.article.find(function (x) {
    return x.id == id;
  });

  let [count, setCount] = useState(findProduct.like)

  const styled = {
      border: "2px solid rgba(255,255,255,0.2)",
      background: "rgba(255,255,255,0.4)",
      borderRadius: "10px",
      zIndex: "2",
      overflow: "hidden",
      backdropFilter: "blur(5px)",
      webkitBackdropFilter: "blur(5px)",
      border: "2px solid rgba(0,0,0,0.2)",
      background: "rgba(0,0,0,0.4)",
    
  }
  
  

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

  // border-radius: 50px;
  // background: #303030;
  // box-shadow:  20px 20px 60px #292929,              -20px -20px 60px #373737;

        {/* {alert == true ? (
        <div className="alert alert-warning">4초이내 구매시 할인</div>
      ) : null} */}

  return (
    <div className="container sub_h detail-b" style={{top: "0px", width: "1024px", backgroundColor: "#111111", boxShadow: "20px 20px 60px #292929, -20px -20px 60px #373737;", padding:"32px" , borderRadius:"50px",}}>

          <p>{findProduct.date}일 발행</p>

      <DetailTitle>
        {findProduct.title}

        <div>
          <button className="book" onClick={() => {dispatch( addItem({ id: 0, name: "White and Black", count: 2,}));}}>북마크</button>  
          <button className="heartDetail" onClick={() => {setCount(count + 1);}}>{count}</button>
           
            
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
            최근 본 상품
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
          <h4>댓글 <span style={{fontSize: "1.2em", color: "gray",paddingLeft: "4px",}}>3</span></h4>

          <TodoTemplate></TodoTemplate>
        </div>

      </div>
    </div>
  );
}

// 


function RecentContent(props) {
  return (
    <div className="recent">
      {/* <p>{props.recentSee}</p> */}
      <img
        src={
          "https://beingborn.github.io/gitImage/space-" +
          (props.recentSee[props.i] + 1) +
          ".jpg"
        }
        width="80px"
      />
      <p>{props.recentSee[props.i]}</p>
    </div>
  );
}

export default Detail;

