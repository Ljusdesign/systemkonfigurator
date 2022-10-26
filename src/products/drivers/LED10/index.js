const driver = {
  name: 'Plejd LED-driver 10W',
  shortName: 'LED-10',
  artNo: 'LED-10',
  outputs: [2],
  settings: [
    {
      current: 150,
      minVoltage: 6.7,
      maxVoltage: 26.7,
      maxPower: 4,
    },
    {
      current: 500,
      minVoltage: 2.86,
      maxVoltage: 25,
      maxPower: 9,
    },
    {
      current: 700,
      minVoltage: 2,
      maxVoltage: 20,
      maxPower: 10,
    },
  ]
}

export default driver
