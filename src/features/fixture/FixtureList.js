import React from 'react'
import cn from 'class-names'
import Fixture from './Fixture'
import styles from './FixtureList.module.css'

function FixtureList({ fixtures, deleteFixture, driverCurrent, selected }) {
  return (
    <div className={cn(styles.list, selected ? styles.selected : '')}>
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
