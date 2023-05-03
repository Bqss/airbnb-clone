import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    initialState : {
        value : {}
    },
    name : "user",
    reducers : {
        setUser : (state, action) => {
            const {user} = action.payload;
            state.value = user;
        },
        reset : (state) => {
            state.value = {};  
        }
    }
});


export default userSlice.reducer;
export const {reset, setUser} = userSlice.actions;