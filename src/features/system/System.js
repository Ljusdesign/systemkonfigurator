import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  selectSelectedSettings,
  loadSystemDriver,
  loadSystemDriverSetting,
  addFixture,
  deleteFixture,
  reset,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/fixtures/CCfixtures'
import CCdrivers from '../../products/drivers/CCdrivers'

import Drivers from './Drivers'
import Settings from './Settings'

const ReloadSymbol = () => (<span>&#x21bb;</span>)

function System() {
  const system = useSelector(selectSystem)
  const selectedSettings = useSelector(selectSelectedSettings)
  const dispatch = useDispatch(systemSlice)

  function changeDriver(driver) {
    dispatch(loadSystemDriver(driver))
  }
  function changeSetting(index, current) {
    dispatch(loadSystemDriverSetting({ index, current }))
  }

  const driverDrawingImage = `url(${system.driver.drawing})`
  const logoImage = `${process.env.PUBLIC_URL}/images/systemkonfigurator.png`

  return (
    <>
      <div className={styles.top}>
        <img src={logoImage} alt="systemkonfigurator logo" width="200" />
      </div>
      <h3>Driver</h3>
      <Drivers
        drivers={CCdrivers}
        selectedDriver={system.driver}
        changeDriver={changeDriver}
      />
      <div className={styles.system}>
        <div className={styles.driver}>
          <h3>{system.driver.name}</h3>
          <div className={styles.features}>
            <table>
              <tbody>
                {system.driver.globalSettings?.maxPower ? (
                  <tr>
                    <td>Max power</td>
                    <td>{system.driver.globalSettings.maxPower} W</td>
                  </tr>
                ) : null}
              </tbody>
            </table>
            {driverDrawingImage ?
              <div
                style={{
                  display: 'inline-block',
                  backgroundImage: driverDrawingImage,
                  backgroundSize: 'cover',
                  height: '10em',
                  width: '20em',
                }}
              ></div>
              : null}
          </div>

          <div className={styles.setting}>
            <h3>Settings</h3>
            <Settings
              changeSetting={changeSetting}
              selectedSettings={selectedSettings}
              outputs={system.driver.outputs}
              settings={system.driver.settings}
            >
            </Settings>
          </div>
        </div>
      </div>
      <div>
        <div>
        </div>

      </div >

      <button
        className={styles.reload}
        onClick={() => dispatch(reset())}>
        <ReloadSymbol />
      </button>
      {
        CCfixtures.map((f, index) => (
          <button
            key={index}
            onClick={() => dispatch(addFixture(CCfixtures[index]))}
          >{f.shortName}</button>
        ))
      }

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
