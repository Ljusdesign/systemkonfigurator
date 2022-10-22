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
  totalCurrent,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/CCfixtures'
import CCdrivers from '../../products/CCdrivers'

const ReloadSymbol = () => (<span>&#x21bb;</span>)
const LightningSymbol = () => (<span>&#128498;</span>)

function Meter({
  name,
  currentValue,
  min,
  max,
  unit,
}) {
  let conditionalStyle = {
    padding: '5px',
  }
  if (currentValue < min) conditionalStyle.background = 'yellow'
  if (currentValue > max) conditionalStyle.background = 'red'
  return (
    <div style={conditionalStyle}>
      {min ?
        `${name} ${currentValue}/${min}-${max} ${unit}` :
        `${name} ${currentValue}/${max} ${unit}`
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
    dispatch(totalCurrent())
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
      <div className={styles.system}>
        <div className={styles.driver}>
          <div>
            <h3>Drivdon</h3>
            <select value={system.driver.index} onChange={changeDriver}>
              {[...CCdrivers.keys()].map((name, value) => (
                <option
                  key={value}
                  value={name}
                >{name}</option>
              ))}
            </select>

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
            <select value={system.driver.selectedSetting.name} onChange={changeSetting}>
              {system.driver.settings.map((settingName, value) => (
                <option
                  key={value}
                  value={settingName.name}
                >{settingName.name}</option>
              ))}
            </select>
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
            </table>
          </div>
        </div>

        <Meter
          name='Effekt'
          max={system.driver.selectedSetting.maxPower}
          currentValue={rounded(system.totalPower)}
          unit='W'
        />
        <Meter
          name='Spänning'
          min={system.driver.selectedSetting.minVoltage}
          max={system.driver.selectedSetting.maxVoltage}
          currentValue={rounded(system.totalVoltage)}
          unit='V'
        />
        <Meter
          name='Ström'
          max={5}
          currentValue={rounded(system.totalCurrent)}
          unit='A'
          symbol={LightningSymbol}
        />
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
