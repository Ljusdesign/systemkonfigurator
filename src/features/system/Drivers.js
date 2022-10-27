import React from 'react'
import styles from './Drivers.module.css'

function Drivers({drivers, selectedDriver, changeDriver}) {
  return (
    <div className={styles.list}>
      {drivers.map(d => (
        <figure
          key={d.artNo}
          className={selectedDriver.artNo === d.artNo ? styles.selected : ''}
          onClick={() => changeDriver(d)}
        >
          <picture>
            {d.cover ? <img src={d.cover} alt={d.name} /> : null}
          </picture>
          <figcaption>
            {d.name}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

export default Drivers
