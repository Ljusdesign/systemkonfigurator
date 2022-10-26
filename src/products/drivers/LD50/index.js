import drawing from './drawing.png'
import cover from './Lightronic_Product_Driver_LD50C-PV2_Bottom_Front.jpg'

const driver = {
  name: 'Lightronic 50W',
  shortName: 'LD50',
  artNo: 'LD50C-PVH-D',
  cover,
  drawing,
  outputs: [2],
  settings: [
    {
      current: 500,
      minVoltage: 6,
      maxVoltage: 60,
      maxPower: 30,
    },
    {
      current: 700,
      minVoltage: 6,
      maxVoltage: 58,
      maxPower: 41,
    },
    {
      current: 1050,
      minVoltage: 6,
      maxVoltage: 48,
      maxPower: 50,
    },
  ]
}

export default driver
