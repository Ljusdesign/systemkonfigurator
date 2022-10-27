import React from 'react'
import styles from './Fixture.module.css'


function Fixture({ fixture, index, deleteFixture, driverCurrent }) {
  const background = `url(${fixture.cover})`
  const highCurrent = `${process.env.PUBLIC_URL}/images/electricity-caution.svg`
  const currentTooHigh = driverCurrent > fixture.maxCurrent

  return (
    <div
      className={styles.fixture}
      style={{
        border: currentTooHigh ? '3px dotted #b3ae22' : '3px solid transparent',
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
      {currentTooHigh && (
        <span className={styles.highCurrent}>
          <img width="20" height="20" src={highCurrent} alt="Current too high" />
        </span>
      )}
    </div>
  )
}

export default Fixture
