import React from 'react'
import cn from 'class-names'
import Fixture from './Fixture'
import styles from './FixtureList.module.css'
import systemSlice, { deleteFixture } from '../system/systemSlice'
import { useDispatch } from 'react-redux'

function FixtureList({ fixtures, driverCurrent, selected, output }) {
  const dispatch = useDispatch(systemSlice)
  return (
    <div className={cn(styles.list, selected ? styles.selected : '')}>
      {fixtures.map((fixture, index) => (
        <Fixture
          key={JSON.stringify(fixture.id + index)}
          index={index}
          fixture={fixture}
          deleteFixture={() => dispatch(deleteFixture({index, output}))}
          driverCurrent={driverCurrent}
        />
      ))}
    </div>
  )
}

export default FixtureList
