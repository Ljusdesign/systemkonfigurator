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

function System () {
  const system = useSelector(selectSystem)
  const dispatch = useDispatch(systemSlice)
  
  useEffect(() => {
    dispatch(totalVoltage())
    dispatch(totalPower())
    dispatch(totalCurrent())
  }, [system.fixtures, dispatch])

  const rounded = number => Math.round(number * 100) / 100

  function changeDriver (event) {
    dispatch(loadSystemDriver(event.target.value))
  }

  return (
    <div className={styles.system}>
      <h2>Systemkonfigurator</h2>

      <h3>Drivdon</h3>
      <select value={system.driver} onChange={changeDriver}>
        <option value={null}>Select driver</option>
        {[...CCdrivers.keys()].map((name, value) => (
          <option
            value={name}
          >{name}</option>
        ))}
      </select>
      <p>Spänningsfall: {rounded(system.totalVoltage)}</p>
      <p>Effekt: {rounded(system.totalPower)}</p>
      <p>Ström: {rounded(system.totalCurrent)}</p>
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
