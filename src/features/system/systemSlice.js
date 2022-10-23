import { createSlice } from '@reduxjs/toolkit'
import { loadDriver } from '../../products/drivers/CCdrivers'

const initialState = {
  driver: loadDriver(),
  fixtures: [],
  totalPower: 0,
  totalVoltage: 0,
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
      const index = state.driver.settings.findIndex(setting => setting.current.toString() === action.payload) || 0
      state.driver.settings[index] ?
        state.driver.selectedSetting = state.driver.settings[index] :
        state.driver.selectedSetting = state.driver.settings[0]
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
        (acc, curr) => (acc + state.driver.selectedSetting.current * curr.voltage) / 1000, 0
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
