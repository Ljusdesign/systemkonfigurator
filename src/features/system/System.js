import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  loadSystemDriver,
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

function Meter ({
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
  }

  return (
    <>
      <div className={styles.system}>
        <h3>Drivdon</h3>
        <select value={system.driver.index} onChange={changeDriver}>
          {[...CCdrivers.keys()].map((name, value) => (
            <option
              value={name}
            >{name}</option>
          ))}
        </select>
        <p>
          {system.driver.name}
        </p>
        <p>

          {system.driver.name}
        </p>
        <Meter
          name='Effekt'
          max={system.driver.settings.maxPower}
          currentValue={rounded(system.totalPower)}
          unit='W'
        />
        <Meter
          name='Spänning'
          min={system.driver.settings.minVoltage}
          max={system.driver.settings.maxVoltage}
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

      <h3>Armaturer</h3>
      <FixtureList
        fixtures={system.fixtures}
        deleteFixture={id => dispatch(deleteFixture(id))}
        driverCurrent={system.driver.settings.current}
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
