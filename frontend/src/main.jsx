import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "../src/Assets/build/css/app.css";
import axios from "axios";
import { Provider } from "react-redux";
import "swiper/css/bundle";
import { store } from "../redux/store/index.js";

// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// //...
// let persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <App />
//       </PersistGate>
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );
