import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "../fitures/modalSlice";


const mainStore = configureStore({
    reducer : {
        "modal" : modalSlice,
    }
});



export default mainStore;