import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  selectSelectedSetting,
  loadSystemDriver,
  loadSystemDriverSetting,
  addFixture,
  deleteFixture,
  reset,
  totalVoltage,
  totalPower,
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
  const selectedSetting = useSelector(selectSelectedSetting)
  const dispatch = useDispatch(systemSlice)

  useEffect(() => {
    dispatch(totalVoltage())
    dispatch(totalPower())
  }, [system.fixtures, dispatch])

  const rounded = number => Math.round(number * 100) / 100

  function changeDriver(event) {
    dispatch(loadSystemDriver(event.target.value))
    dispatch(loadSystemDriverSetting(selectedSetting.current))
  }
  function changeSetting(event) {
    dispatch(loadSystemDriverSetting(event.target.value))
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
              {[...CCdrivers.keys()].map((name, value) => (
                <label key={name}>
                  <input
                    type="radio"
                    key={value}
                    value={name}
                    checked={system.driver.index === name}
                    onChange={e => changeDriver(e)}
                  /> {name}
                </label>
              ))}
            </form>

          </div>

          <div className={styles.setting}>
            <h3>Setting</h3>
            <form onSubmit={changeSetting}>
              {system.driver.settings.map(setting => (
                <label key={setting.current}>
                  <input
                    type="radio"
                    value={setting.current}
                    checked={setting.current === selectedSetting.current}
                    onChange={e => changeSetting(e)}
                  />
                  {setting.current}mA
                </label>
              ))}
            </form>
          </div>
        </div>
        <div className={styles.features}>
          <h3>{system.driver.name}</h3>
          <table>
            <tbody>
              <tr>
                <td>Min voltage</td>
                <td>{selectedSetting.minVoltage}</td>
              </tr>
              <tr>
                <td>Max voltage</td>
                <td>{selectedSetting.maxVoltage}</td>
              </tr>
              <tr>
                <td>Max power</td>
                <td>{selectedSetting.maxPower}</td>
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
              low={selectedSetting.minPower}
              high={selectedSetting.maxPower}
              value={rounded(system.totalPower)}
              unit='W'
            />
            <Meter
              name='Voltage'
              low={selectedSetting.minVoltage}
              high={selectedSetting.maxVoltage}
              value={rounded(system.totalVoltage)}
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
        driverCurrent={selectedSetting.current}
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
