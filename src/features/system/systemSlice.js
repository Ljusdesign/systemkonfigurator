import { createSlice } from '@reduxjs/toolkit'
import { loadDriver } from '../../products/CCdrivers'

const initialState = {
  driver: loadDriver(),
  fixtures: [],
}

let fixtureId = 0
export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    loadSystemDriver: (state, action) => {
      state.driver = loadDriver(action.payload)
    },
    loadSystemDriverSetting: (state, action) => {
      const index = state.driver.settings.findIndex(setting => setting.name === action.payload)
      state.driver.selectedSetting = state.driver.settings[index]
    },
    addFixture: (state, action) => {
      state.fixtures.push({
        ...action.payload,
        id: fixtureId++,
      })
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
        (acc, curr) => acc + state.driver.selectedSetting.current * curr.voltage, 0
      )
    },
    setColor: (state, action) => {
      const { id, color } = action
      state.fixtures[id].color = color
    },
    reset: () => initialState,
  }
})

export const { loadSystemDriver, loadSystemDriverSetting, addFixture, deleteFixture, updateFixtureCurrent, reset, totalVoltage, totalPower, totalCurrent, setColor } = systemSlice.actions

export const selectSystem = state => state.system
export const selectFixtures = state => state.system.fixtures

export default systemSlice.reducer
