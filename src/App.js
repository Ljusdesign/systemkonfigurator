import React from 'react'
import produce from 'immer'
import './App.css'

import System from './features/system/System'
import Fixture from './features/fixture/Fixture'

import drivers from './products/drivers'
import CCfixtures from './products/CCfixtures'

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

function App() {
  let CCSystem = {
    driver: drivers.cc.LD30,
    track: tracks.LEDProfileHigh,
    fixtures: [
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
      <System />
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
