import produce from 'immer'

import TCIProfessionale from './professionale'
import LD30 from './LD30'
import LD50 from './LD50'
import MaxiJolly from './MaxiJolly'
import POWERdrive from './POWERdrive1060A'
import LED10 from './LED10'

const drivers = [
  TCIProfessionale,
  LD30,
  LD50,
  MaxiJolly,
  POWERdrive,
  LED10,
]

/* load default driver and setting */
function loadDriver (driverObject = POWERdrive) {
  return produce(driverObject, driver => {
  })
}

export { loadDriver }
export default drivers
