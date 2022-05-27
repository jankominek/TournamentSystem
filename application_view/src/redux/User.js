import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
    firstName: "",
    lastName: "",
    username: "",
    authorities: [],
    token: "",
    tournaments: [],
    rank: 0
}

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUserState: (state, action) => {
            console.log("payload: ", action.payload)
            Object.entries(action.payload).map( ([key, value]) =>{
                state[key] = value;
            })
        },
    }
})
export const {setUserState} = userSlice.actions;
export default userSlice.reducer;