import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";
import user from "./store/userSlice";

// const store = createStore(rootReducer);

//  Redux의 state 변경 법
// - state 수정 함수 만들기

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 1, name: "Grey Yordan", count: 1 },
    { id: 2, name: "오징어 젓갈", count: 5 },
    { id: 3, name: "메인리두서", count: 1 },
    { id: 4, name: "메롱메롤", count: 1 },
  ],

  reducers: {
    addCount(state, action) {
      let findItemId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[findItemId].count++;
    },

    // findIndex 는 해당 값이 없으면 -1을 반환한다. 있으면 id값을 반환하고

    addItem(state, action) {
      let addItemId = state.findIndex((a) => {
        return a.id === action.payload.id;
      });

      if (addItemId !== -1) {
        //해당 아이템 값 중복 여부가 true 일 시 해당 값의 count를 증가 시킵니다.
        state[addItemId].count++;
      } else {
        state.push(action.payload); // 해당 아이템 값 중복 여부가 false 일 시 해당 배열에 추가합니다.
      }

      // }
    },
    deleteItem(state, action) {
      let deleteItemId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(deleteItemId, 1); // 전달 받은 id 값 1개를 배열에서 삭제합니다.
    },
  },
});

export let { addCount, addItem, deleteItem } = cart.actions;

let stock = createSlice({
  name: "stock", // state 이름
  initialState: [10, 11, 12], // state 값
});

export default configureStore({
  reducer: {
    user: user.reducer,
    stock: stock.reducer,
    cart: cart.reducer,
  },
});
