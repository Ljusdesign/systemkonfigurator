import React from 'react'
import Fixture from './Fixture'

function FixtureList({fixtures}) {
  return (
    <div>
      {fixtures.map((fixture, index) => (
        <Fixture key={index} fixture={fixture} />
      ))}
    </div>
  )
}

export default FixtureList
