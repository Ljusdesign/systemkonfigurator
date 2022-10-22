import React from 'react'
import styles from './Fixture.module.css'


function Fixture({ fixture, index, deleteFixture, driverCurrent }) {
  const background = `url(${process.env.PUBLIC_URL}/images/${fixture.image})`
  const highCurrent = `${process.env.PUBLIC_URL}/images/electricity-caution.svg`

  return (
    <div
      className={styles.fixture}
      style={{
        backgroundImage: background,
        backgroundSize: 'contain',
      }}
    >
      {index+1}
      <button
        onClick={() => deleteFixture(fixture.id)}
        className={styles.deleteButton}
      >✗</button>
      <div className={styles.text}>{fixture.shortName}</div>
      {driverCurrent > fixture.maxCurrent && (
        <span className={styles.highCurrent}>
          <img width="20" height="20" src={highCurrent} alt="Current too high" />
        </span>
      )}
    </div>
  )
}

export default Fixture
