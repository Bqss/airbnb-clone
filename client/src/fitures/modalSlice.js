import {createSlice} from "@reduxjs/toolkit"; 

const ModalSlice = createSlice({
    initialState : {
        openRegisterModal : true,
        openLoginModal : false,
        openAddAirbnbModal : false,
    },
    name : "modals",
    reducers : {
        toggleOpenRegisterModal : (state) => {
            state.openRegisterModal = !state.openRegisterModal
        },
        toggleOpenLoginModal : (state) => {
            state.openLoginModal =! state.openLoginModal
        },
        toggleOpenAddAirbnbModal : (state) => {
            state.openAddAirbnbModal =! state.openAddAirbnbModal
        },
    }
})


export default ModalSlice.reducer;

export const {toggleOpenAddAirbnbModal, toggleOpenLoginModal, toggleOpenRegisterModal} = ModalSlice.actions; 