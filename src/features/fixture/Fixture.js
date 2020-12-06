import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
  setColor,
  selectColor
} from './fixtureSlice'

function Fixture ({fixture}) {
  const dispatch = useDispatch()
  const selector = useSelector(selectColor)
  return (
    <div style={{border: '4px dotted', borderColor: fixture.color}}>
      <pre style={{textAlign: 'left'}}>
        {fixture.shortName} {fixture.id}
      </pre>
      <button
        onClick={() => dispatch(setColor('grey'))}
      > grey </button>
      <button
        onClick={() => dispatch(setColor('black'))}
      > black </button>
      <button
        onClick={() => dispatch(setColor('white'))}
      > white </button>
    </div>
  )
}

export default Fixture
