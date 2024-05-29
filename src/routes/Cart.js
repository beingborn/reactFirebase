import { Table } from "react-bootstrap";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice.js";
import { addCount, deleteItem, reset} from "../store.js";
import { useQuery } from "react-query";
import axios from "axios";



// memo == 꼭 필요할 때만 재 렌더링 + props 전송 시 props 값이 변할 때마다 렌더링


function Cart() {

  const styled = {
    border: "2px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.6)",
    borderRadius: "10px",
    zIndex: "2",
    overflow: "hidden",
    backdropFilter: "blur(5px)",
    webkitBackdropFilter: "blur(5px)",
    border: "2px solid rgba(0,0,0,0.2)",
    background: "rgba(0,0,0,0.4)",
    padding : "32px",
}



  let result = useQuery(["작명"], () => {
    return axios
      .get("https://beingborn.github.io/gitImage/userdata.json")
      .then((res) => {
        return res.data;
        
      });
  });
 
  let Child = memo(function(){
    return(
          <p className="user-sayHello">
          {result.isLoading && "로딩중"}
          {result.error && "에러남"}
          {" "}
          <span className="user-name">
            {result.data && result.data.name}
          </span>
        님의 북마크
      </p>
    )
             
  })
  




  useEffect(()=>{
    
    const body = document.querySelector("body");
    const sub_h = document.querySelector(".sub_h");
    let wh = window.innerHeight;
   
   
    sub_h.style.height = wh+"px";
    sub_h.style.height = ( wh - (body.scrollHeight - wh) ) + "px";
    sub_h.style.position = "relative"
   
   }, []) 

  let [count, setCount] = useState(0);


  let state = useSelector((state) => state);

  let cartItem = useSelector((state) => state.cart);

  let dispatch = useDispatch(); // store.js 로 요청 보내주는 함수

  let tableStyle = {
    background : "transparent",
    color : "#fff"
  }

  return (
    <div className="sub_h cart-wrap" style={styled}>

      <div className="book-flex">
        
        <Child count={count}></Child>
        <p style={{fontWeight : "bold", marginLeft : "12px"}}>{cartItem.length}개의 글
            <button className="delete" style={{marginLeft : "12px"}} onClick={() => { dispatch(reset(state));}}>전체 삭제</button>
        </p>
      </div>

      <Table className="table_custom" id="table-main" >
        <thead>
          <tr>
            <th>글 인덱스</th>
            <th>상품명</th>
            <th>저자명</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>

          {/* 반복문 사용시 key 속성을 사용해 주면 좋다. */}
          {cartItem.map((a, i) => {
            return (
              <tr key={i}>

                <td className="item-index">{cartItem[i].id}번
                
                {
                  cartItem[i].label ? <div className="label-new">NEW !</div> : null
                }
                
                </td>
                <td>{cartItem[i].title}</td>
                <td>{cartItem[i].author}</td>
                <td>
                  {/* <button onClick={() => { dispatch(addCount(state.cart[i].like)); }}>+</button> */}
                  <button className="delete"
                    onClick={() => { dispatch(deleteItem(state.cart[i].id));}}
                  >
                    삭제하기
                  </button>
                </td>
                {/* dispatch 는 store.js 에게 메시지를 보내는 거라 생각 */}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Cart;
