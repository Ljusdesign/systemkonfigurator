import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  addFixture,
  deleteFixture,
  reset,
  totalVoltage,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixtures from '../../products/CCfixtures'

function System () {
  const system = useSelector(selectSystem)
  const dispatch = useDispatch(systemSlice)
  
  useEffect(() => {
    dispatch(totalVoltage())
  }, [system.fixtures, dispatch])

  return (
    <div className={styles.system}>
      <h2>Systemkonfigurator</h2>

      <p>Spänningsfall: {system.totalVoltage}</p>
      <button onClick={() => dispatch(reset())}>reset</button>
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
