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
      state.driver.outputs[action.payload.index] = state.driver.settings.findIndex(s => s.current === action.payload.current)
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

export const { loadSystemDriver, loadSystemDriverSetting, addFixture, deleteFixture, updateFixtureCurrent, reset } = systemSlice.actions

export const selectSystem = state => state.system
export const selectOutputs = state => state.system.driver.outputs
export const selectSelectedSettings = state => {
  const result = state.system.driver.outputs.map((o, index) => {
    return state.system.driver.settings[o]
  })
  return result
}
export const selectFixtures = state => state.system.fixtures
export const selectTotalPower = state => state.system.driver.outputs.map((o, index) => {
  if (index === 0) {
    return state.system.fixtures.reduce(
      (acc, curr) => acc + state.system.driver.settings[index].current * curr.voltage / 1000,
      0
    )
  } else {
    return 0
  }
})
export const selectTotalVoltage = state => state.system.driver.outputs.map((o, index) => {
  return state.system.fixtures.reduce(
    (acc, curr) => index === 0 ? acc + curr.voltage : 0, 0
  )
})

export default systemSlice.reducer
