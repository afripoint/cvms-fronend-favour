// import { combineReducers } from "@reduxjs/toolkit"
// import authReducer from "../../modules/auth/redux/slices/authSlice"
// import passwordResetReducer from "../../modules/auth/redux/slices/passwordResetSlice"
// import uiReducer from "../../modules/auth/redux/slices/uiSlice"
// import vinReducer from "../../modules/vin/redux/slices/vinSlice"
// import cartReducer from "../../modules/cart/redux/slices/cartSlice"

// const rootReducer = combineReducers({
//   auth: authReducer,
//   passwordReset: passwordResetReducer,
//   ui: uiReducer,
//   vin: vinReducer,
//   cart: cartReducer,
// })

// export default rootReducer



import { combineReducers } from "@reduxjs/toolkit"
import authReducer from "../../modules/auth/redux/slices/authSlice"
import passwordResetReducer from "../../modules/auth/redux/slices/passwordResetSlice"
import uiReducer from "../../modules/auth/redux/slices/uiSlice"
import vinReducer from "../../modules/vin/redux/slices/vinSlice"
import cartReducer from "../../modules/cart/redux/slices/cartSlice"
import reportReducer from '../../modules/report/redux/slices/certificateSlice';
const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  passwordReset: passwordResetReducer,
  vin: vinReducer,
  cart: cartReducer,
  reports: reportReducer,

})

export default rootReducer

