import { Table } from "react-bootstrap";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeName, increase } from "../store/userSlice.js";
import { addCount, deleteItem } from "../store.js";



// memo == 꼭 필요할 때만 재 렌더링 + props 전송 시 props 값이 변할 때마다 렌더링
let Child = memo(function(){
  console.log("재랜더링된거임?")
  return <div>안녕하세요 관리자님!</div>
})


function Cart() {


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
  let username = useSelector((state) => state.user.name);


  // cartItem을 state로 받은것에 할당하겠다.
  let cartItem = useSelector((state) => state.cart);
  let dispatch = useDispatch(); // store.js 로 요청 보내주는 함수

  let tableStyle = {
    background : "transparent",
    color : "#fff"
  }

  return (
    <div className="sub_h">

      <Child count={count}></Child>
      
      {/* <button onClick={()=>{
        setCount(count + 1)
      }}>+</button> */}

      
      {username}의 블로그 글 목록
      {state.user.age}개의 글
      <button
        onClick={() => {
          dispatch(increase(100));
        }}
      >
        나이를 먹자
      </button>
      <Table className="table_custom" >
        <thead>
          <tr>
            <th>상품인덱스</th>
            <th>상품명</th>
            <th>재고개수</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {/* <td>{cartItem[0].id}</td>
      <td>{cartItem[0].name}</td>
      <td>{cartItem[0].count}</td> */}

          {/* 반복문 사용시 key 속성을 사용해 주면 좋다. */}
          {cartItem.map((a, i) => {
            return (
              <tr key={i}>
                <td>{cartItem[i].id}번</td>
                <td>{cartItem[i].title}</td>
                <td>{cartItem[i].like}개</td>
                <td>
                  <button
                    onClick={() => {
                      dispatch(addCount(state.cart[i].id)); // state 값 옆 아이디를 의미
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch(deleteItem(state.cart[i].id)); // state 값 옆 아이디 받기
                    }}
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
