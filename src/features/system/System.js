import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from './System.module.css'
import {
  systemSlice,
  selectSystem,
  addFixture,
  reset,
} from './systemSlice'
import FixtureList from '../fixture/FixtureList'
import CCfixture from '../../products/CCfixtures'

function System (
) {
  const system = useSelector(selectSystem)
  const dispatch = useDispatch(systemSlice)
  return (
    <div className={styles.system}>
      <h2>System</h2>
      <p>Total voltage: {system.totalVoltage}</p>
      <button
        onClick={() => dispatch(addFixture(CCfixture.Gizmo))}
      >
        Add Gizmo CC
      </button>
      <button
        onClick={() => dispatch(reset())}
      >
        Reset
      </button>
      <h3>Fixtures:</h3>
      <FixtureList fixtures={system.fixtures} />

      <pre style={{textAlign: 'left'}}>
        State: {JSON.stringify(system, null, 2)}
      </pre>
    </div>
  )
}

export default System
