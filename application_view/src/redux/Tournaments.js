import { createSlice } from "@reduxjs/toolkit";
const init = {
    tournaments : []
}
export const tournamentSlice = createSlice({
    name: "tournaments",
    initialState: init,
    reducers: {
        setTournamentState: (state, action) => {
            state.tournaments = action.payload;
        },
    }
})
export const {setTournamentState} = tournamentSlice.actions;
export default tournamentSlice.reducer;