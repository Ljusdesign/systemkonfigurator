import produce from 'immer'

const drivers = new Map([
  ['LD30 dimmer', {
    name: 'Lightronic CC LED-driver 30w med dimmer',
    shortName: 'LD30',
    artNo: 'LD30-PV2-D',
    settings: {
      '350mA': {
        current: 0.350,
        minVoltage: 6,
        maxVoltage: 60,
        maxPower: 21,
      },
      '500mA': {
        current: 0.5,
        minVoltage: 6,
        maxVoltage: 58,
        maxPower: 29,
      },
      '700mA': {
        current: 0.7,
        minVoltage: 6,
        maxVoltage: 43,
        maxPower: 30,
      },
    }
  }],
  ['LD50 dimmer', {
    name: 'Lightronic CC LED-driver 50W med dimmer',
    shortName: 'LD50',
    artNo: 'LD50C-PVH-D',
    settings: {
      '500mA': {
        current: 0.500,
        minVoltage: 6,
        maxVoltage: 60,
        maxPower: 30,
      },
      '700mA': {
        current: 0.700,
        minVoltage: 6,
        maxVoltage: 58,
        maxPower: 41,
      },
      '1050mA': {
        current: 1.050,
        minVoltage: 6,
        maxVoltage: 48,
        maxPower: 50,
      },
    }
  }],
])

function loadDriver (name = 'LD30 dimmer', setting = '700mA') {
  return produce(drivers.get(name), driver => {
    driver.settings = driver.settings[setting]
    driver.index = name
  })
}

export { loadDriver }
export default drivers
