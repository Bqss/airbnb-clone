import {createSlice} from "@reduxjs/toolkit"; 

const ModalSlice = createSlice({
    initialState : {
        openRegisterModal : false,
        openLoginModal : false,
        openAddAirBnbModal : false,
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
        toggleOpenAddAirbnbModal : (state) => {
            state.openAddAirBnbModal =! state.openAddAirBnbModal
        },
    }
})


export default ModalSlice.reducer;

export const {toggleOpenAddAirbnbModal, toggleOpenLoginModal, toggleOpenRegisterModal} = ModalSlice.actions; 