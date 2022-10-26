import { createSlice } from '@reduxjs/toolkit'
import { loadDriver } from '../../products/drivers/CCdrivers'

const initialState = {
  driver: loadDriver(),
  fixtures: [],
}

const nearest = (goal, prev, curr) => Math.abs(curr-goal) < Math.abs(prev-goal)

let fixtureId = 0
export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    loadSystemDriver: (state, action) => {
      state.driver = loadDriver(action.payload)
    },
    loadSystemDriverSetting: (state, action) => {
      /* find nearest setting */
      const selectedSetting = state.driver.settings.reduce(
        (prev, curr) => nearest(action.payload, prev.current, curr.current) ? curr : prev
      )
      state.driver.settingIndex = state.driver.settings.findIndex(s => s === selectedSetting)
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
    setColor: (state, action) => {
      const { id, color } = action
      state.fixtures[id].color = color
    },
    reset: () => initialState,
  }
})

export const { loadSystemDriver, loadSystemDriverSetting, addFixture, deleteFixture, updateFixtureCurrent, reset, totalVoltage, totalPower, totalCurrent, setColor } = systemSlice.actions

export const selectSystem = state => state.system
export const selectSettingIndex = state => state.system.driver.settingIndex
export const selectSelectedSetting = state => state.system.driver.settings[state.system.driver.settingIndex]
export const selectFixtures = state => state.system.fixtures
export const selectTotalPower = state => state.system.fixtures.reduce(
  (acc, curr) => acc + state.system.driver.settings[state.system.driver.settingIndex].current * curr.voltage / 1000,
  0
)
export const selectTotalVoltage = state => state.system.fixtures.reduce(
  (acc, curr) => acc + curr.voltage, 0
)

export default systemSlice.reducer
