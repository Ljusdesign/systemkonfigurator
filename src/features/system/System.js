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
  selectTotalPower,
  selectTotalVoltage,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/fixtures/CCfixtures'
import CCdrivers from '../../products/drivers/CCdrivers'

import Drivers from './Drivers'

const ReloadSymbol = () => (<span>&#x21bb;</span>)
const LightningSymbol = () => (<span>&#128498;</span>)

function Meter({
  name,
  value,
  low = 1,
  high,
  unit,
}) {
  return (
    <div className={styles.meter}>
      <label htmlFor="meter">{name}<br /></label>
      {value < high ?
        <meter low={low} max={high} value={value}>{value}</meter> :
        <meter low={low} high={high} optimum={0} max={high * 1.01} value={value}>{value}</meter>
      }
      <br />
      {low ?
        `${value} (${low}-${high} ${unit})` :
        `${value} (${high} ${unit})`
      }
    </div>
  )
}

function System() {
  const system = useSelector(selectSystem)
  const selectedSettings = useSelector(selectSelectedSettings)
  const totalPower = useSelector(selectTotalPower)
  const totalVoltage = useSelector(selectTotalVoltage)
  const dispatch = useDispatch(systemSlice)

  const rounded = number => Math.round(number * 100) / 100

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
            <div className={styles.settingChannels}>
              {system.driver.outputs.map((o, index) => (
                <div className={styles.channel} key={index}>
                  <p>Ch. {index + 1}</p>
                  <form onSubmit={changeSetting}>
                    {system.driver.settings.map(setting => (
                      <label key={setting.current}>
                        <input
                          type="radio"
                          value={setting.current}
                          checked={setting.current === selectedSettings[index].current}
                          onChange={e => changeSetting(index, setting.current)}
                        />
                        {setting.current} mA
                      </label>
                    ))}
                  </form>
                  <div className={styles.meters}>
                    <Meter
                      name='Power'
                      low={selectedSettings[index].minPower}
                      high={selectedSettings[index].maxPower}
                      value={rounded(totalPower[index])}
                      unit='W'
                    />
                    <Meter
                      name='Voltage'
                      low={selectedSettings[index].minVoltage}
                      high={selectedSettings[index].maxVoltage}
                      value={rounded(totalVoltage[index])}
                      unit='V'
                    />
                  </div>
                </div>
              ))}
            </div>
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
