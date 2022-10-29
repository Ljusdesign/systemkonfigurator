import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  selectDriver,
  selectSelectedSettings,
  getSystemDriver,
  getSystemDriverSetting,
  deleteFixture,
  selectOutputs,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import FixturePicker from '../fixture/FixturePicker'
import CCfixtures from '../../products/fixtures/CCfixtures'
import CCdrivers from '../../products/drivers/CCdrivers'

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
  const selectedOutputs = useSelector(selectOutputs)
  const dispatch = useDispatch(systemSlice)

  function changeDriver(index) {
    dispatch(getSystemDriver(index))
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
        drivers={CCdrivers}
        selectedDriver={selectedDriver}
        changeDriver={changeDriver}
      />
      <div className={styles.system}>
        <div className={styles.driver}>
          <div className={styles.setting}>
            <Settings
              changeSetting={changeSetting}
              selectedSettings={selectedSettings}
              outputs={selectedDriver.outputs}
              settings={selectedDriver.settings}
            />
            <div className={styles.features}>
              {selectedDriver.globalSettings?.maxPower && (
                <MaxPowerMeter maxPower={selectedDriver.globalSettings.maxPower} />
              )}
            </div>
          </div>
        </div>
      </div>

      <FixturePicker fixtures={CCfixtures} />

      <div className={styles.channelOutputs}>
        {system.driver.outputs.map((o, index) => (
          <>
            <FixtureList
              key={index}
              fixtures={system.fixtures}
              deleteFixture={id => dispatch(deleteFixture(id))}
              driverCurrent={selectedSettings[index].current}
            />
          </>
        ))}
      </div>

      <div>
        <pre className={styles.json}>
          State: {JSON.stringify(system, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default System
