const driver = {
  name: 'Lightronic CC LED-driver 30W med dimmer',
  shortName: 'LD30',
  artNo: 'LD30-PV2-D',
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
