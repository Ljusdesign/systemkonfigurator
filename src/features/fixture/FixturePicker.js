import React from 'react'
import { useDispatch } from 'react-redux'
import {
  systemSlice,
  addFixture,
} from '../system/systemSlice'
import styles from './../system/Drivers.module.css'

function FixturePicker({ selectedOutput, fixtures }) {
  const dispatch = useDispatch(systemSlice)
  return (
    <div className={styles.list}>
      {fixtures.map((f, index) => (
        <figure
          key={index}
          onClick={() => dispatch(addFixture({selectedOutput, index: f.id}))}
        >
          <picture>
            <img src={f.cover} alt={f.shortName} />
          </picture>
          <figcaption>{f.shortName}</figcaption>
        </figure>
      ))}
    </div>
  )
}

export default FixturePicker
