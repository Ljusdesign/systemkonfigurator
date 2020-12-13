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
      <div className={styles.text}>{fixture.shortName}</div>
      {driverCurrent > fixture.maxCurrent && (
        <span className={styles.highCurrent}>&#128498;</span>
      )}
    </div>
  )
}

export default Fixture
