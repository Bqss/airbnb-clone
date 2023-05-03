import {configureStore} from "@reduxjs/toolkit";
import modalSlice from "../fitures/modalSlice";
import userSlice from "../fitures/userSlice";


const mainStore = configureStore({
    reducer : {
        "modal" : modalSlice,
        "user": userSlice,
    }
});



export default mainStore;