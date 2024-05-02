import { configureStore, createSlice } from '@reduxjs/toolkit'
import { createStore } from 'redux';

// const store = createStore(rootReducer);

let user = createSlice({
  name : 'user',                                // state 이름
  initialState : 'KIM'                     // state 값  
})

let stock = createSlice({
  name : 'stock',                                // state 이름
  initialState : [10,11,12]                     // state 값  
})



export default configureStore({
  reducer: { 
    user : user.reducer,
    stock : stock.reducer
  }
}) 