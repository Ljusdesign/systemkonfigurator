import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  addFixture,
  deleteFixture,
  updateFixtureCurrent,
  reset,
  totalVoltage,
  totalPower,
  totalCurrent,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/CCfixtures'

const ReloadSymbol = () => (<span>&#x21bb;</span>)

function System () {
  const system = useSelector(selectSystem)
  const dispatch = useDispatch(systemSlice)
  
  useEffect(() => {
    dispatch(totalVoltage())
    dispatch(totalPower())
    dispatch(totalCurrent())
    dispatch(updateFixtureCurrent())
  }, [system.fixtures, dispatch])

  const rounded = number => Math.round(number * 100) / 100

  return (
    <div className={styles.system}>
      <h2>Systemkonfigurator</h2>

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

      <h3>Fixtures:</h3>
      <FixtureList fixtures={system.fixtures} deleteFixture={id => dispatch(deleteFixture(id))} />

      <pre style={{ textAlign: 'left' }}>
        State: {JSON.stringify(system, null, 2)}
      </pre>
    </div>
  )
}

export default System
