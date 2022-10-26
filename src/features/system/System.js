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
    dispatch(loadSystemDriverSetting({index, current}))
  }

  const driverImage = `url(${system.driver.image})`
  const logoImage = `${process.env.PUBLIC_URL}/images/systemkonfigurator.png`

  return (
    <>
      <div className={styles.top}>
        <img src={logoImage} alt="systemkonfigurator logo" width="200" />
      </div>
      <div className={styles.system}>
        <div className={styles.driver}>
          <div className={styles.driverType}>
            <h3>Driver</h3>
            <form>
              {CCdrivers.map((driver, index) => {
                return (
                  <label key={driver.name}>
                    <input
                      type="radio"
                      key={index}
                      value={driver.name}
                      checked={driver.shortName === system.driver.shortName}
                      onChange={e => changeDriver(driver)}
                    /> {driver.name}
                  </label>
                )
              }
              )}
            </form>

          </div>

          <div className={styles.setting}>
            <h3>Settings</h3>
            <div className={styles.settingChannels}>
              {system.driver.outputs.map((o, index) => (
                <div key={index}>
                <p>Ch. {index+1}</p>
                  <form onSubmit={changeSetting}>
                    {system.driver.settings.map(setting => (
                      <label key={setting.current}>
                        <input
                          type="radio"
                          value={setting.current}
                          checked={setting.current === selectedSettings[index].current}
                          onChange={e => changeSetting(index, setting.current)}
                        />
                        {setting.current}mA
                      </label>
                    ))}
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.features}>
          <h3>{system.driver.name}</h3>
          <table>
            <tbody>
              <tr>
                <td>Min voltage</td>
                <td>{selectedSettings[0].minVoltage}</td>
              </tr>
              <tr>
                <td>Max voltage</td>
                <td>{selectedSettings[0].maxVoltage}</td>
              </tr>
              <tr>
                <td>Max power</td>
                <td>{selectedSettings[0].maxPower}</td>
              </tr>
            </tbody>
          </table>
          {driverImage ?
            <div
              style={{
                backgroundImage: driverImage,
                backgroundSize: 'contain',
                width: '10em',
                height: '10em',
              }}
            ></div>
            : null}
        </div>
      </div>
      <div>
        <div>
          <div className={styles.meters}>
            <Meter
              name='Power'
              low={selectedSettings[0].minPower}
              high={selectedSettings[0].maxPower}
              value={rounded(totalPower)}
              unit='W'
            />
            <Meter
              name='Voltage'
              low={selectedSettings[0].minVoltage}
              high={selectedSettings[0].maxVoltage}
              value={rounded(totalVoltage)}
              unit='V'
            />
          </div>
        </div>

      </div >

      <button
        className={styles.reload}
        onClick={() => dispatch(reset())}>
        <ReloadSymbol />
      </button>
      {
        [...CCfixtures.keys()].map((name, value) => (
          <button
            key={value}
            onClick={() => dispatch(addFixture(CCfixtures.get(name)))}
          >{name}</button>
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
