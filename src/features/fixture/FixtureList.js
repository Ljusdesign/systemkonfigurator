import React from 'react'
import Fixture from './Fixture'
import styles from './FixtureList.module.css'

function FixtureList({fixtures, deleteFixture }) {
  return (
    <div className={styles.list}>
      {fixtures.map((fixture) => (
        <Fixture
          key={fixture.id}
          fixture={fixture}
          deleteFixture={deleteFixture}
        />
      ))}
    </div>
  )
}

export default FixtureList
