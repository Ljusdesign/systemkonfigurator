import drawing from './drawing.png'

const driver = {
  name: 'Maxi Jolly',
  shortName: 'Maxi Jolly',
  artNo: 'M-JOL',
  image: drawing,
  outputs: [4],
  settings: [
    {
      current: 350,
      minVoltage: 2,
      maxVoltage: 74,
      maxPower: 25,
    },
    {
      current: 500,
      minVoltage: 2,
      maxVoltage: 72,
      maxPower: 35,
    },
    {
      current: 550,
      minVoltage: 2,
      maxVoltage: 72,
      maxPower: 39,
    },
    {
      current: 650,
      minVoltage: 2,
      maxVoltage: 72,
      maxPower: 46,
    },
    {
      current: 700,
      minVoltage: 2,
      maxVoltage: 72,
      maxPower: 50,
    },
    {
      current: 750,
      minVoltage: 2,
      maxVoltage: 72,
      maxPower: 54,
    },
    {
      current: 850,
      minVoltage: 2,
      maxVoltage: 70,
      maxPower: 60,
    },
    {
      current: 900,
      minVoltage: 2,
      maxVoltage: 66,
      maxPower: 60,
    },
    {
      current: 1000,
      minVoltage: 2,
      maxVoltage: 60,
      maxPower: 60,
    },
    {
      current: 1050,
      minVoltage: 2,
      maxVoltage: 57,
      maxPower: 60,
    },
  ]
}

export default driver
