import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";
import user from "./store/userSlice";

// const store = createStore(rootReducer);

//  Redux의 state 변경 법
// - state 수정 함수 만들기

let cart = createSlice({
  name: "cart",
  initialState: [
    // {
    //   id: 0,
    //   title: "REACT를 배움에 있어서 이런 고충이 있었다. 그렇지만 그럴 수 밖에 없었기에 이러쿵 저러쿵이었다..",
    //   content: "상세내용은 이랬기때문에 실제로 프로젝트를 제작해 보기로 ...",
    //   price: 120000,
    //   like: 3,
    // },
  
    // {
    //   id: 1,
    //   title: "Red Knit",
    //   content: "상세내용은 이랬기때문에 실제로 프로젝트를 제작해 보기로 ...",
    //   price: 110000,
    //   like: 5,
    // },
  
    // {
    //   id: 2,
    //   title: "Grey Yordan",
    //   content: "Born in the States",
    //   price: 130000,
    //   like: 7,
    // },
  
    // {
    //   id: 3,
    //   title: "앙 Yordan",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like: 3,
    // },
  
    // {
    //   id: 4,
    //   title: "앙 Yordan",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like: 12,
    // },
  
    // {
    //   id: 5,
    //   title: "하아..",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like: 15,
    // },
  
    // {
    //   id: 6,
    //   title: "기로기로",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like:20,
    // },
  
    // {
    //   id: 7,
    //   title: "케로케로",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like:22,
    // },
  
    // {
    //   id: 8,
    //   title: "모르겠는데요.. 부에노아이레스",
    //   content: "부rn in the States",
    //   price: 150000,
    //   like:30,
    // },
  ],
 // 수량 증가.. 뭐 굳이 인듯?
  reducers: {
    addCount(state, action) {
      let findItemId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[findItemId].like++;
    },

    // findIndex 는 해당 값이 없으면 -1을 반환한다. 있으면 id값을 반환하고
    addItem(state, action) {
      let addItemId = state.findIndex((a) => {
        return a.id === action.payload.id;
      });

      if (addItemId !== -1) {
        //해당 아이템 값 중복 여부가 true 일 시 해당 값의 count를 증가 시킵니다.
        state[addItemId].like++;
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

export let { addCount, addItem, deleteItem } = cart.actions; // 해당 store가 가진 함수 export하기

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

// 이건 기억안남