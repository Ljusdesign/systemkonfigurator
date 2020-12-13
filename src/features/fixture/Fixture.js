import React from 'react'
import styles from './Fixture.module.css'

function Fixture({ fixture, deleteFixture, driverCurrent }) {
  const background = `url(${process.env.PUBLIC_URL}/images/${fixture.image})`
  return (
    <div
      className={styles.fixture}
      style={{
        backgroundImage: background,
        backgroundSize: 'contain',
      }}
    >
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
