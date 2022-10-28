import React from 'react'
import { useSelector } from 'react-redux'
import {
  selectSelectedSettings,
  selectTotalPower,
  selectTotalVoltage,
} from './systemSlice'
import styles from './Meters.module.css'

function Meter({
  name,
  value,
  low = 1,
  high,
  unit,
}) {
  return (
    <div className={styles.meter}>
      <label htmlFor="meter">{name}<br /></label>
      {value < high ?
        <meter low={low} max={high} value={value}>{value}</meter> :
        <meter low={low} high={high} optimum={0} max={high * 1.01} value={value}>{value}</meter>
      }
      <br />
      {low ?
        `${value} (${low}-${high} ${unit})` :
        `${value} (${high} ${unit})`
      }
    </div>
  )
}

const rounded = number => Math.round(number * 100) / 100

function Meters({ index }) {
  const selectedSettings = useSelector(selectSelectedSettings)
  const totalPower = useSelector(selectTotalPower)
  const totalVoltage = useSelector(selectTotalVoltage)

  return (
    <div className={styles.meters}>
      <Meter
        name='Power'
        className={styles.meter}
        low={selectedSettings[index].minPower}
        high={selectedSettings[index].maxPower}
        value={rounded(totalPower[index])}
        unit='W'
      />
      <Meter
        name='Voltage'
        className={styles.meter}
        low={selectedSettings[index].minVoltage}
        high={selectedSettings[index].maxVoltage}
        value={rounded(totalVoltage[index])}
        unit='V'
      />
    </div>
  )
}

function MaxPowerMeter({ maxPower }) {
  const totalPower = useSelector(selectTotalPower)
  const driverTotalPower = totalPower.reduce((prev, curr) => prev + curr, 0)

  return (
    <div className={styles.meters}>
      <Meter
        name='Driver total max power'
        low={0}
        high={maxPower}
        value={rounded(driverTotalPower)}
        unit='W'
      />
    </div>
  )
}

export { MaxPowerMeter }
export default Meters
