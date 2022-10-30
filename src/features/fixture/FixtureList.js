import React from 'react'
import Fixture from './Fixture'
import styles from './FixtureList.module.css'

function FixtureList({fixtures, deleteFixture, driverCurrent }) {
  return (
    <div className={styles.list}>
      {fixtures.map((fixture, index) => (
        <Fixture
          key={JSON.stringify(fixture.id + index)}
          index={index}
          fixture={fixture}
          deleteFixture={deleteFixture}
          driverCurrent={driverCurrent}
        />
      ))}
    </div>
  )
}

export default FixtureList
