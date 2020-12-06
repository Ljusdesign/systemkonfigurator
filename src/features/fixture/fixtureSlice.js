import { createSlice } from '@reduxjs/toolkit';

export const fixtureSlice = createSlice({
  name: 'fixture',
  initialState: {
    color: 'black',
  },
  reducers: {
    setColor: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.color = action.payload
    },
  },
});

export const { setColor } = fixtureSlice.actions

export const selectColor = state => state.system.fixtures[0]

export default fixtureSlice.reducer
