import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  loadSystemDriver,
  loadSystemDriverSetting,
  addFixture,
  deleteFixture,
  reset,
  totalVoltage,
  totalPower,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/CCfixtures'
import CCdrivers from '../../products/CCdrivers'

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
      <label htmlFor="meter">{name}: <br /></label>
      {value < high ?
        <meter low={low} max={high} value={value}>{value}</meter> :
        <meter low={low} high={high} optimum={0} max={high*1.1} value={value}>{value}</meter>
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
  const dispatch = useDispatch(systemSlice)

  useEffect(() => {
    dispatch(totalVoltage())
    dispatch(totalPower())
  }, [system.fixtures, dispatch])

  const rounded = number => Math.round(number * 100) / 100

  function changeDriver(event) {
    dispatch(loadSystemDriver(event.target.value))
    dispatch(loadSystemDriverSetting(system.driver.selectedSetting.name))
  }
  function changeSetting(event) {
    dispatch(loadSystemDriverSetting(event.target.value))
  }

  const driverImage = `url(${process.env.PUBLIC_URL}/images/${system.driver.image})`

  return (
    <>
      <div className={styles.top}>
        <img src="/images/systemkonfigurator.png" width="200" />
      </div>
      <div className={styles.system}>
        <div className={styles.driver}>
          <h2>Drivdon</h2>
          <div className={styles.driverType}>
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

            <div
              style={{
                backgroundImage: driverImage,
                backgroundSize: 'contain',
                width: '10em',
                height: '10em',
              }}
            ></div>

          </div>

          <div className={styles.setting}>
            <h3>Inställning</h3>
            <form onSubmit={changeSetting}>
              {system.driver.settings.map(setting => (
                <label key={setting.name}>
                  <input
                    type="radio"
                    value={setting.name}
                    checked={setting.name === system.driver.selectedSetting.name}
                    onChange={e => changeSetting(e)}
                  />
                  {setting.name}
                </label>
              ))}
            </form>
            <table>
              <tbody>
                <tr>
                  <td>Min voltage</td>
                  <td>{system.driver.selectedSetting.minVoltage}</td>
                </tr>
                <tr>
                  <td>Max voltage</td>
                  <td>{system.driver.selectedSetting.maxVoltage}</td>
                </tr>
                <tr>
                  <td>Max power</td>
                  <td>{system.driver.selectedSetting.maxPower}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.meters}>
            <Meter
              name='Effekt'
              low={system.driver.selectedSetting.minPower}
              high={system.driver.selectedSetting.maxPower}
              value={rounded(system.totalPower)}
              unit='W'
            />
            <Meter
              low={system.driver.selectedSetting.minVoltage}
              high={system.driver.selectedSetting.maxVoltage}
              value={rounded(system.totalVoltage)}
              unit='V'
            />
          </div>

        </div>

      </div>
      <button
        className={styles.reload}
        onClick={() => dispatch(reset())}>
        <ReloadSymbol />
      </button>
      {[...CCfixtures.keys()].map((name, value) => (
        <button
          key={value}
          onClick={() => dispatch(addFixture(CCfixtures.get(name)))}
        >{name}</button>
      ))}

      <FixtureList
        fixtures={system.fixtures}
        deleteFixture={id => dispatch(deleteFixture(id))}
        driverCurrent={system.driver.selectedSetting.current}
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
