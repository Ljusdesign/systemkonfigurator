import { createSlice } from '@reduxjs/toolkit'
import drivers from '../../products/drivers/CCdrivers'
import CCfixtures from '../../products/fixtures/CCfixtures'

const initialState = {
  driver: {
    index: 0,
    outputs: drivers[0].outputs,
  },
  fixtures: [
    []
  ],
  allDrivers: drivers,
  allFixtures: CCfixtures,
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
      state.fixtures = state.driver.outputs.map((o, index) => (
        [index] = []
      ))
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
      const { selectedOutput, index } = action.payload
      state.fixtures[selectedOutput].push({id: index, index: fixtureId++})
    },
    deleteFixture: (state, action) => {
      const { selectedOutput, index } = action.payload
      state.fixtures[selectedOutput].splice(
        state.fixtures[selectedOutput].findIndex(fix => fix.id === index),
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

export const selectAllFixtures = state => state.system.allFixtures

export const selectFixtures =
  state => state.system.driver.outputs.map(
    (o, oIndex) => state.system.fixtures[oIndex].map(
      f => state.system.allFixtures.filter(
        af => f.id === af.id
      )[0]
    )
  )

export const selectTotalPower =
  state => state.system.driver.outputs.map(
    (o, index) => (
      state.system.fixtures[index].reduce(
        (acc, curr) => acc + state.system.allDrivers[state.system.driver.index].settings[o].current * curr.voltage / 1000,
        0
      )
    )
  )

export default systemSlice.reducer
