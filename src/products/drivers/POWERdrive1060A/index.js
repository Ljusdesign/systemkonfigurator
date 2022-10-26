import cover from './1632297756-product-image-powerdrive1060a-398x398.avif'
import drawing from './drawing.png'

const driver = {
  name: 'POWERdrive 1060/A',
  shortName: 'Pdrive 1060',
  artNo: 'ELDO.PAC160/A',
  cover,
  drawing,
  outputs: [5, 5, 2, 0],
  settings: [
    {
      current: 350,
      minVoltage: 2,
      maxVoltage: 57,
      maxPower: 20,
    },
    {
      current: 400,
      minVoltage: 2,
      maxVoltage: 55, /* ? */
      maxPower: 20,
    },
    {
      current: 500,
      minVoltage: 2,
      maxVoltage: 50,
      maxPower: 25,
    },
    {
      current: 550,
      minVoltage: 2,
      maxVoltage: 47, /* ? */
      maxPower: 25,
    },
    {
      current: 650,
      minVoltage: 2,
      maxVoltage: 40, /* ? */
      maxPower: 25,
    },
    {
      current: 700,
      minVoltage: 2,
      maxVoltage: 35.7,
      maxPower: 25,
    },
    {
      current: 750,
      minVoltage: 2,
      maxVoltage: 32, /* ? */
      maxPower: 25,
    },
    {
      current: 850,
      minVoltage: 2,
      maxVoltage: 30, /* ? */
      maxPower: 25,
    },
    {
      current: 900,
      minVoltage: 2,
      maxVoltage: 28, /* ? */
      maxPower: 25,
    },
    {
      current: 1000,
      minVoltage: 2,
      maxVoltage: 26, /* ? */
      maxPower: 25,
    },
    {
      current: 1050,
      minVoltage: 2,
      maxVoltage: 23.8,
      maxPower: 25,
    },
  ],
  globalSettings: {
    maxPower: 100,
  }
}

export default driver
