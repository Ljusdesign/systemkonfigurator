import React from 'react'
import produce from 'immer'
import './App.css'

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
const tracks = {
  "PicoTracLow": {
    name: "PicoTrac Low",
    height: 10,
    voltage: 12,
    maxAmpere: 5,
  },
  "PicoTracHigh": {
    name: "PicoTrac High",
    height: 17,
    voltage: 12,
    maxAmpere: 10,
  },
  "MiniTrac": {
    name: 'MiniTrac',
    voltage: 12,
    maxAmpere: 20,
  },
  "LEDProfileHigh": {
    name: 'LED-Profile High',
    height: 17,
  },
  "LEDProfileLow": {
    name: 'LED-Profile Low',
    height: 10,
  },
}

const PTfixtures = {
  "Gizmo": {
    name: "Gizmo PicoTrac",
    shortName: "Gizmo",
    effect: 3,
    voltage: 12,
    current: 0.25,
    length: 0,
  },
}

const CCfixtures = {
  'Gizmo': {
    name: 'Gizmo CC for LED-profile',
    shortName: "Gizmo",
    voltage: 3,
    current: 0.7,
    length: 0,
  },
}

const System = ({
  driver = drivers.cc.LD30,
  track = tracks.LEDProfile, fixtures
}) => ({
  driver, track, fixtures,
})

function App() {
  let CCSystem = {
    driver: drivers.cc.LD30,
    track: tracks.LEDProfileHigh,
    fixtures: [
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
      CCfixtures.Gizmo,
    ],
  }

  function fixtureVoltage () {
    return this.fixtures.reduce((acc, curr) => acc + curr.voltage, 0)
  }
  CCSystem.fixtureVoltage = fixtureVoltage.bind(CCSystem)

  function fixturePower () {
    return this.fixtures.reduce((acc, curr) => acc + curr.current * curr.voltage, 0)
  }
  CCSystem.fixturePower = fixturePower.bind(CCSystem)

  return (
    <div className="App">
      <p>Total voltage of system: {CCSystem.fixtureVoltage()}</p>
      <p>Max voltage of system: {CCSystem.driver.maxVoltage}</p>
      <p>Total power of system: {CCSystem.fixturePower()}</p>
      <p>Max power of system: {CCSystem.driver.maxPower}</p>
      <div>
        {CCSystem.fixtures.map(fixture => (
          <span style={{fontFamily: 'monospace'}}>
            {fixture.shortName}&nbsp;
          </span>
        ))}
      </div>
      <pre style={{ textAlign: 'left'}}>
        {JSON.stringify(CCSystem, null, 2)}
      </pre>
    </div>
  );
}

export default App;
