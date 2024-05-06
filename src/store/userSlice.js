import { createSlice } from "@reduxjs/toolkit";

let user = createSlice({
  name: "user", // state 이름
  initialState: { name: "kim", age: 20 }, // state 값
  reducers: {
    changeName(state) {
      // state 파라미터 추가 시 기존 스테이트를 뜻함
      state.name = "minhuk kim"; // object , array 자료의 경우 return 을 사용하지 않아도 된다.
    },

    increase(state, action) {
      state.age += action.payload;
    },
  },
});

export let { changeName, increase } = user.actions; // const, let 선언 시 호이스팅이 되지않는다.
export default user;
