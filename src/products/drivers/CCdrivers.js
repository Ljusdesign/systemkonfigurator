import produce from 'immer'

import TCIProfessionale from './professionale'
import LD30 from './LD30'
import LD50 from './LD50'
import MaxiJolly from './MaxiJolly'
import LED10 from './LED10'

const drivers = new Map([
  ['TCI Professionale', TCIProfessionale],
  ['LD30 dimmer', LD30],
  ['LD50 dimmer', LD50],
  ['Maxi Jolly', MaxiJolly],
  ['LED-10', LED10],
])

function loadDriver (name = 'Maxi Jolly', setting = 700) {
  return produce(drivers.get(name), driver => {
    driver.index = name
    const settingIndex = driver.settings.findIndex(s => s.current === setting) || 0
    driver.selectedSetting = driver.settings[settingIndex]
  })
}

export { loadDriver }
export default drivers
