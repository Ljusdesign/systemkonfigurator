import { configureStore } from '@reduxjs/toolkit'
import systemReducer from '../features/system/systemSlice'
import fixtureReducer from '../features/fixture/fixtureSlice'

export default configureStore({
  reducer: {
    system: systemReducer,
    fixture: fixtureReducer,
  },
})
