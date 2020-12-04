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

const fixtures = {
  'GizmoCC': {
    name: 'Gizmo CC for LED-profile',
    voltage: 3,
  }
}

const System = ({
  driver,
  tracks = [],
  fixtures = [],
}) => ({
  driver, tracks, fixtures,
  toString: () => console.log(driver.name),
})

const CCSystem = Object.create(System({
  driver: drivers.cc.LD30,
  track: 'LED-Profile',
  fixtures: [],
}))
CCSystem.fixtureVoltage = () => this.fixtures.reduce((acc, curr) => acc + curr.voltage, 0)
const newSystem = produce(CCSystem, draftState => {
  draftState.fixtures.push([fixtures.GizmoCC, fixtures.GizmoCC])
})
function App() {

  return (
    <div className="App">
      <h1>Systemkonfigurator</h1>
      <p>Fixtures in system: {newSystem.fixtureVoltage()}</p>
      <h2>New state</h2>
      <pre style={{
        textAlign: 'left',
        background: '#ccc',
        display: 'inline-block',
        padding: '1em',
      }}>
        {JSON.stringify(newSystem, null, 2)}
      </pre>
    </div>
  );
}

export default App;
