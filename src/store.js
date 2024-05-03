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
    { id: 2, name: 'Grey Yordan', count: 1 },
    { id: 3, name: '오징어 젓갈', count: 5 },
    { id: 4, name: '메인리두서', count: 1 },
    { id: 5, name: '메롱메롤', count: 1 },
  ],

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