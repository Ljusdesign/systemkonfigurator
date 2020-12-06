import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fixtures: [],
  totalVoltage: 0,
}
export const systemSlice = createSlice({
  name: 'system',
  initialState: initialState,
  reducers: {
    addFixture: (state, action) => {
      state.fixtures.push({...action.payload, id: state.fixtures.length})
    },
    reset: state => initialState,
    totalVoltage: (state) => {
      state.totalVoltage = state.fixtures.reduce(
        (acc, curr) => acc + curr.voltage, 0
      )
    }
  }
})

export const { addFixture, reset } = systemSlice.actions

export const selectSystem = state => state.system

export default systemSlice.reducer
