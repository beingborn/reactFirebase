import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createStore } from 'redux';
import user from "./store/userSlice"

// const store = createStore(rootReducer);

//  Redux의 state 변경 법 
// - state 수정 함수 만들기





let cart = createSlice({
  name: 'cart',
  initialState: [
    { id: 0, name: 'White and Black', count: 2 },
    { id: 1, name: 'Grey Yordan', count: 1 },
    { id: 2, name: '오징어 젓갈', count: 5 },
    { id: 3, name: '메인리두서', count: 1 },
    { id: 4, name: '메롱메롤', count: 1 },
  ],


  // 첫번째로 우선 모든 카운트를 늘리는 것부터 구현하는 게 좋을 것 같다.

});

let stock = createSlice({
  name : 'stock',                                // state 이름
  initialState : [10,11,12]                     // state 값  
})



export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer,
    cart : cart.reducer,
  }
}) 