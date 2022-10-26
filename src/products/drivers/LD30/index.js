import cover from './Lightronic_Product_Drivers_LD30C-PV2_Front.jpg'
import drawing from './ld30-drawing.png'

const driver = {
  name: 'Lightronic 30W',
  shortName: 'LD30',
  artNo: 'LD30-PV2-D',
  cover,
  drawing,
  outputs: [2],
  settings: [
    {
      current: 350,
      minVoltage: 6,
      maxVoltage: 60,
      maxPower: 21,
    },
    {
      current: 500,
      minVoltage: 6,
      maxVoltage: 58,
      maxPower: 29,
    },
    {
      current: 700,
      minVoltage: 6,
      maxVoltage: 43,
      maxPower: 30,
    },
  ],
}

export default driver
