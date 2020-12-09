import React from 'react'
import styles from './Fixture.module.css'

function Fixture({ fixture, deleteFixture }) {
  return (
    <div
      className={styles.fixture}
      style={{ borderColor: fixture.color, }}>
      <button
        onClick={() => deleteFixture(fixture.id)}
        className={styles.deleteButton}
      >✗</button>
      {fixture.shortName}
    </div>
  )
}

export default Fixture
