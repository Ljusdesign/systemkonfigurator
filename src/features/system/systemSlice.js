import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fixtures: [],
  totalVoltage: 0,
  totalPower: 0,
}

let fixtureId = 0
export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    addFixture: (state, action) => {
      state.fixtures.push({...action.payload, id: fixtureId++})
    },
    deleteFixture: (state, action) => {
      state.fixtures.splice(
        state.fixtures.findIndex(fix => fix.id === action.payload),
        1
      )
    },
    totalVoltage: state => {
      state.totalVoltage = state.fixtures.reduce(
        (acc, curr) => acc + curr.voltage, 0
      )
    },
    totalPower: state => {
      state.totalPower = state.fixtures.reduce(
        (acc, curr) => acc + curr.current * curr.voltage, 0
      )
    },
    setColor: (state, action) => {
      const { id, color } = action
      state.fixtures[id].color = color
    },
    reset: () => initialState,
  }
})

export const { addFixture, deleteFixture, reset, totalVoltage, totalPower, setColor } = systemSlice.actions

export const selectSystem = state => state.system
export const selectFixtures = state => state.system.fixtures

export default systemSlice.reducer
