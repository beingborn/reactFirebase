import { configureStore, createSlice } from "@reduxjs/toolkit";
import { createStore } from "redux";
import user from "./store/userSlice";

// const store = createStore(rootReducer);

//  Redux의 state 변경 법
// - state 수정 함수 만들기
const initialState = {
  returned: []
}


let cart = createSlice({
  name: "cart",
  
  initialState: [
    {
      id: 6,
      title: "우주 에너지 자원의 탐사",
      content: `태양 에너지를 우주에서 직접 수집하는 기술이 개발되고 있다. 새로운 형태의 에너지 저장 기술이 연구되고 있다. 소행성에서의 자원 채굴이 현실화되고 있다. 우주 에너지는 지구의 에너지 문제를 해결할 수 있는 가능성을 가지고 있다. 행성 간 에너지 전송 기술도 발전하고 있다. 지속 가능한 우주 에너지 시스템 구축이 목표다. 우주 태양광 발전소는 지구를 위한 무한한 에너지원이 될 수 있다. 미래에는 우주에서 직접 에너지를 공급받는 시대가 올 것이다.`,
      price: 150000,
      like:20,
      date : "2024-05-28",
      source : "https://unsplash.com",
      author : "by 어드민리"  
    },
  
    {
      id: 7,
      title: "인공지능과 우주 탐사",
      content: `인공지능은 우주 탐사의 핵심 기술로 자리 잡고 있다. AI가 탐사 로봇을 조종하며 행성 탐사를 수행하고 있다. 데이터 분석에서 AI의 역할이 점점 커지고 있다. 우주 비행의 모든 단계에서 AI가 사용되고 있다. 인공지능은 우주선의 자율 비행을 가능하게 한다. AI 시스템이 우주 비행사의 건강을 모니터링하고 있다. 우주 정거장에서 AI가 과학 실험을 도와준다. AI는 우주 탐사의 효율성을 극대화하는 데 기여하고 있다.`,
      price: 150000,
      like:22,
      date : "2024-07-28",
      source : "https://unsplash.com",
      author : "by 어드민리"
    },
  
    {
      id: 8,
      title: "우주에서의 인간 생존 연구",
      content: `우주 환경에서 인간의 생존을 연구하는 프로젝트가 진행 중이다. 무중력 상태에서의 건강 유지 방법이 개발되고 있다. 식량과 물의 자급자족 시스템이 실험되고 있다. 우주 방사선으로부터 보호하는 기술이 연구되고 있다. 우주에서의 장기 체류를 위한 심리적 지원이 중요하다. 우주 거주지의 디자인과 구조가 발전하고 있다. 인류는 화성과 같은 다른 행성에서의 생존 가능성을 테스트하고 있다. 이러한 연구는 미래의 우주 정착에 중요한 역할을 할 것이다.`,
      price: 150000,
      like:30,
      date : "2024-08-28",
      source : "https://unsplash.com",
      author : "by 어드민리"
    },

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
        // alert("북마크에 존재합니다!")
        //해당 아이템 값 중복 여부가 true 일 시 해당 값의 count를 증가 시킵니다.
        // state[addItemId].like++;
      } else {

        let newItem = { ...action.payload, label: 'new' };
        state.push(newItem);
        // state.push(action.payload); // 해당 아이템 값 중복 여부가 false 일 시 해당 배열에 추가합니다.
        // return "it's new!"
      }

      // 북마크에 추가해서 중복 여부가 false일 시 해당 북마크에 new 라벨을 붙이고 싶다.

      // }
    },
    deleteItem(state, action) {
      let deleteItemId = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state.splice(deleteItemId, 1); // 전달 받은 id 값 1개를 배열에서 삭제합니다.
    },

    reset(state, action) {
      state.map((i)=>{
        console.log(i)
      })
      // let copyState = [...state]
      // copyState.forEach((i)=>{
      //   if(i <= copyState.length){
      //     copyState.splice(0,i)
      //   }
      // })
      
      // copyState = state
      
      // Object.assign(state, initialState);
    }

  },
});

export let { addCount, addItem, deleteItem, reset } = cart.actions; // 해당 store가 가진 함수 export하기

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