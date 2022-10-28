import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  selectSelectedSettings,
  loadSystemDriver,
  loadSystemDriverSetting,
  deleteFixture,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import FixturePicker from '../fixture/FixturePicker'
import CCfixtures from '../../products/fixtures/CCfixtures'
import CCdrivers from '../../products/drivers/CCdrivers'

import Drivers from './Drivers'
import Settings from './Settings'
import { MaxPowerMeter } from './Meters'

function System() {
  const system = useSelector(selectSystem)
  const selectedSettings = useSelector(selectSelectedSettings)
  const dispatch = useDispatch(systemSlice)

  function changeDriver(driver) {
    dispatch(loadSystemDriver(driver))
  }
  function changeSetting(index, e) {
    dispatch(loadSystemDriverSetting({ index, current: e.value }))
  }

  const driverDrawingImage = `url(${system.driver.drawing})`
  const logoImage = `${process.env.PUBLIC_URL}/images/systemkonfigurator.png`

  return (
    <>
      <div className={styles.top}>
        <img src={logoImage} alt="systemkonfigurator logo" width="200" />
      </div>
      <h3>{system.driver.name}</h3>
      <Drivers
        drivers={CCdrivers}
        selectedDriver={system.driver}
        changeDriver={changeDriver}
      />
      <div className={styles.system}>
        <div className={styles.driver}>
          <div className={styles.setting}>
            <Settings
              changeSetting={changeSetting}
              selectedSettings={selectedSettings}
              outputs={system.driver.outputs}
              settings={system.driver.settings}
            />
            <div className={styles.features}>
              {system.driver.globalSettings?.maxPower && (
                <MaxPowerMeter maxPower={system.driver.globalSettings.maxPower} />
              )}
            </div>
          </div>
        </div>
      </div>

      <FixturePicker fixtures={CCfixtures} />

      <FixtureList
        fixtures={system.fixtures}
        deleteFixture={id => dispatch(deleteFixture(id))}
        driverCurrent={selectedSettings[0].current}
      />

      <div>
        <pre className={styles.json}>
          State: {JSON.stringify(system, null, 2)}
        </pre>
      </div>
    </>
  )
}

export default System
