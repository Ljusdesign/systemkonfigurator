import produce from 'immer'

const drivers = new Map([
  ['LD30 dimmer', {
    name: 'Lightronic CC LED-driver 30w med dimmer',
    shortName: 'LD30',
    artNo: 'LD30-PV2-D',
    settings: [
      {
        name: '350mA',
        current: 0.350,
        minVoltage: 6,
        maxVoltage: 60,
        maxPower: 21,
      },
      {
        name: '500mA',
        current: 0.5,
        minVoltage: 6,
        maxVoltage: 58,
        maxPower: 29,
      },
      {
        name: '700mA',
        current: 0.7,
        minVoltage: 6,
        maxVoltage: 43,
        maxPower: 30,
      },
    ]
  }],
  ['LD50 dimmer', {
    name: 'Lightronic CC LED-driver 50W med dimmer',
    shortName: 'LD50',
    artNo: 'LD50C-PVH-D',
    settings: [
      {
        name: '500mA',
        current: 0.500,
        minVoltage: 6,
        maxVoltage: 60,
        maxPower: 30,
      },
      {
        name: '700mA',
        current: 0.700,
        minVoltage: 6,
        maxVoltage: 58,
        maxPower: 41,
      },
      {
        name: '1050mA',
        current: 1.050,
        minVoltage: 6,
        maxVoltage: 48,
        maxPower: 50,
      },
    ]
  }],
  ['Maxi Jolly', {
    name: 'Maxi Jolly',
    shortName: 'Maxi Jolly',
    artNo: 'M-JOL',
    image: 'maxi-jolly.png',
    settings: [
      {
        name: '350mA',
        current: 0.350,
        minVoltage: 2,
        maxVoltage: 74,
        maxPower: 25,
      },
      {
        name: '500mA',
        current: 0.500,
        minVoltage: 2,
        maxVoltage: 72,
        maxPower: 35,
      },
      {
        name: '550mA',
        current: 0.550,
        minVoltage: 2,
        maxVoltage: 72,
        maxPower: 39,
      },
      {
        name: '650mA',
        current: 0.650,
        minVoltage: 2,
        maxVoltage: 72,
        maxPower: 46,
      },
      {
        name: '700mA',
        current: 0.700,
        minVoltage: 2,
        maxVoltage: 72,
        maxPower: 50,
      },
      {
        name: '750mA',
        current: 0.750,
        minVoltage: 2,
        maxVoltage: 72,
        maxPower: 54,
      },
      {
        name: '850mA',
        current: 0.850,
        minVoltage: 2,
        maxVoltage: 70,
        maxPower: 60,
      },
      {
        name: '900mA',
        current: 0.900,
        minVoltage: 2,
        maxVoltage: 66,
        maxPower: 60,
      },
      {
        name: '1000mA',
        current: 1.000,
        minVoltage: 2,
        maxVoltage: 60,
        maxPower: 60,
      },
      {
        name: '1050mA',
        current: 1.050,
        minVoltage: 2,
        maxVoltage: 57,
        maxPower: 60,
      },
    ]
  }],
])

function loadDriver (name = 'LD30 dimmer', setting = '700mA') {
  return produce(drivers.get(name), driver => {
    driver.index = name
    const settingIndex = driver.settings.findIndex(s => s.name === setting)
    driver.selectedSetting = driver.settings[settingIndex]
  })
}

export { loadDriver }
export default drivers
