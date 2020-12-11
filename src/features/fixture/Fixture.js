import React from 'react'
import styles from './Fixture.module.css'

function Fixture({ fixture, deleteFixture, driverCurrent }) {
  return (
    <div
      className={styles.fixture}
      style={{ borderColor: fixture.color, }}>
      <button
        onClick={() => deleteFixture(fixture.id)}
        className={styles.deleteButton}
      >✗</button>
      {fixture.shortName}
      {driverCurrent > fixture.maxCurrent && (
        <span>Current too high</span>
      )}
    </div>
  )
}

export default Fixture
