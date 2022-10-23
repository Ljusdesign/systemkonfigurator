const driver = {
  name: 'Lightronic CC LED-driver 50W med dimmer',
  shortName: 'LD50',
  artNo: 'LD50C-PVH-D',
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
