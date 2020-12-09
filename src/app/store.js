import { configureStore } from '@reduxjs/toolkit'
import systemReducer from '../features/system/systemSlice'

export default configureStore({
  reducer: {
    system: systemReducer,
  },
})
