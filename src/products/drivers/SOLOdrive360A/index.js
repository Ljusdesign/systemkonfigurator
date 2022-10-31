import cover from './1632227095-product-image-solodrive360a-398x398.avif'
import drawing from './drawing.png'

const driver = {
  name: 'SOLOdrive 360/A',
  shortName: 'Sdrive 360',
  artNo: 'ELDO.SAC360/A',
  cover,
  drawing,
  outputs: [4], /* 350mA default setting */
  settings: [
    {
      current: 150,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 200,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 250,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 300,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 350,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 400,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 500,
      minVoltage: 2,
      maxVoltage: 55,
    },
    {
      current: 600,
      minVoltage: 2,
      maxVoltage: 50,
      maxPower: 30,
    },
    {
      current: 650,
      minVoltage: 2,
      maxVoltage: 46,
      maxPower: 30,
    },
    {
      current: 700,
      minVoltage: 2,
      maxVoltage: 30,
      maxPower: 30,
    },
    {
      current: 750,
      minVoltage: 2,
      maxVoltage: 40,
      maxPower: 30,
    },
    {
      current: 800,
      minVoltage: 2,
      maxVoltage: 37.5,
      maxPower: 30,
    },
    {
      current: 850,
      minVoltage: 2,
      maxVoltage: 30,
      maxPower: 30,
    },
    {
      current: 900,
      minVoltage: 2,
      maxVoltage: 33.3,
      maxPower: 30,
    },
    {
      current: 950,
      minVoltage: 2,
      maxVoltage: 31.5,
      maxPower: 30,
    },
    {
      current: 1000,
      minVoltage: 2,
      maxVoltage: 30,
      maxPower: 30,
    },
    {
      current: 1050,
      minVoltage: 2,
      maxVoltage: 28.5,
      maxPower: 30,
    },
    {
      current: 1100,
      minVoltage: 2,
      maxVoltage: 27,
      maxPower: 30,
    },
    {
      current: 1150,
      minVoltage: 2,
      maxVoltage: 26,
      maxPower: 30,
    },
    {
      current: 1200,
      minVoltage: 2,
      maxVoltage: 25,
      maxPower: 30,
    },
    {
      current: 1250,
      minVoltage: 2,
      maxVoltage: 24,
      maxPower: 30,
    },
    {
      current: 1300,
      minVoltage: 2,
      maxVoltage: 23,
      maxPower: 30,
    },
    {
      current: 1350,
      minVoltage: 2,
      maxVoltage: 22,
      maxPower: 30,
    },
    {
      current: 1400,
      minVoltage: 2,
      maxVoltage: 21.5,
      maxPower: 30,
    },
  ],
  globalSettings: {
    maxPower: 30,
  }
}

export default driver
