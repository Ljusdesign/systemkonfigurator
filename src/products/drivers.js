const drivers = {
  '12v': [
    {
      'SNP15w': {
        name: 'Snappy 15w',
        power: 15,
        voltage: 12,
      }
    }
  ],
  'cc': {
    'LD30': {
      name: 'LD30w',
      current: 0.7,
      maxPower: 30,
      minVoltage: 6,
      maxVoltage: 43,
    }
  }
}

export default drivers
