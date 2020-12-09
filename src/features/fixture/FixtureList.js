import React from 'react'
import Fixture from './Fixture'

function FixtureList({fixtures, deleteFixture }) {
  return (
    <div style={{border: '1px dotted blue'}}>
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
