import { createSlice } from '@reduxjs/toolkit'
import drivers from '../../products/drivers/CCdrivers'
import fixtures from '../../products/fixtures/CCfixtures'

const initialState = {
  driver: {
    index: 0,
    outputs: drivers[0].outputs,
  },
  fixtures: [],
  allDrivers: drivers,
  allFixtures: fixtures,
}

const nearest = (goal, prev, curr) => Math.abs(curr-goal) < Math.abs(prev-goal)

let fixtureId = 0
export const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    getSystemDriver: (state, action) => {
      const { index } = action.payload
      state.driver.index = index
      state.driver.outputs = state.allDrivers[index].outputs
    },
    getSystemDriverSetting: (state, action) => {
      const {index, current} = action.payload
      /* TODO find nearest setting */
      state.driver.outputs[index] =
        state.allDrivers[state.driver.index].settings.findIndex(
          s => s.current === current
        )
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

export const {
  getSystemDriver, getSystemDriverSetting,
  addFixture,deleteFixture, updateFixtureCurrent,
  reset
} = systemSlice.actions

export const selectSystem =
  state => state.system

export const selectDriver =
  state => state.system.allDrivers[state.system.driver.index]

export const selectOutputs =
  state => state.system.allDrivers[state.system.driver.index].outputs

export const selectSelectedSettings =
  state => state.system.driver.outputs.map(
    output => state.system.allDrivers[state.system.driver.index].settings[output]
  )

export const selectAllDrivers =
  state => state.system.allDrivers

export const selectAllFixtures =
  state => state.system.allFixtures

export const selectTotalPower =
  state => state.system.allDrivers[state.system.driver.index].outputs.map(
    (o, index) => (
      state.system.fixtures.reduce(
        (acc, curr) => acc + state.system.allDrivers[state.system.driver.index].settings[index].current * curr.voltage / 1000,
        0
      )
    )
  )
export const selectTotalVoltage =
  state => state.system.allDrivers[state.system.driver.index].outputs.map(
    (o, index) => (
      state.system.fixtures.reduce(
        (acc, curr) => index === 0 ? acc + curr.voltage : 0, 0
      )
    )
  )

export default systemSlice.reducer
