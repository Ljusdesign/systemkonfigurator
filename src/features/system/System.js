import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  selectDriver,
  selectSelectedSettings,
  selectAllDrivers,
  selectAllFixtures,
  getSystemDriver,
  getSystemDriverSetting,
  selectFixtures,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import FixturePicker from '../fixture/FixturePicker'

import Drivers from './Drivers'
import Settings from './Settings'
import { MaxPowerMeter } from './Meters'

export const PrintDebug = ({ children }) => (
  <pre className={styles.json}>
    {children.map(c => JSON.stringify(c, null, 2))}
  </pre>
)

function System() {
  const system = useSelector(selectSystem)
  const selectedDriver = useSelector(selectDriver)
  const selectedSettings = useSelector(selectSelectedSettings)
  const allFixtures = useSelector(selectAllFixtures)
  const selectedFixtures = useSelector(selectFixtures)
  const allDrivers = useSelector(selectAllDrivers)

  const fixtureVoltages = selectedFixtures.map(
    (o, oIndex) => o.reduce((acc, f) => acc + f.voltage, 0)
  )
  const dispatch = useDispatch(systemSlice)
  const [selectedOutput, setOutput] = useState(0)

  function changeDriver(index) {
    dispatch(getSystemDriver({ index }))
  }
  function changeSetting(index, e) {
    dispatch(getSystemDriverSetting({ index, current: e.value }))
  }

  const driverDrawingImage = `url(${selectedDriver.drawing})`
  const logoImage = `${process.env.PUBLIC_URL}/images/systemkonfigurator.png`

  return (
    <>
      <div className={styles.top}>
        <img src={logoImage} alt="systemkonfigurator logo" width="200" />
      </div>
      <h3>{selectedDriver.name}</h3>
      <Drivers
        drivers={allDrivers}
        selectedDriver={selectedDriver}
        changeDriver={changeDriver}
      />
      <div className={styles.setting}>
        <Settings
          changeSetting={changeSetting}
          selectedSettings={selectedSettings}
          outputs={selectedDriver.outputs}
          settings={selectedDriver.settings}
        />
        <div className={styles.features}>
          {selectedDriver.globalSettings?.maxPower && (
            <MaxPowerMeter
              fixtureVoltages={fixtureVoltages}
              selectedSettings={selectedSettings}
              maxPower={selectedDriver.globalSettings.maxPower}
            />
          )}
        </div>
      </div>

      <FixturePicker selectedOutput={selectedOutput} fixtures={allFixtures} />

      <div className={styles.channelOutputs}>
        {selectedDriver.outputs.map((o, index) => (
          <div
            key={index}
            className={styles.outputLane}
          >
            <button onClick={() => setOutput(index)}>Set output {index+1}</button>
            <FixtureList
              key={index}
              fixtures={selectedFixtures[index]}
              driverCurrent={selectedSettings[index].current}
              output={index}
              selected={index === selectedOutput}
            />
          </div>
        ))}
      </div>

      <PrintDebug>
        State: {system}
      </PrintDebug>
    </>
  )
}

export default System
