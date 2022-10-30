import React from 'react'
import styles from './Meters.module.css'

function Meter({
  name,
  value,
  low = 1,
  high,
  unit,
}) {
  return (
    <>
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
    </>
  )
}

const rounded = number => Math.round(number * 100) / 100

function Meters({ selectedSettings, totalVoltage, totalPower }) {
  const { minPower, maxPower } = selectedSettings
  const { minVoltage, maxVoltage } = selectedSettings

  return (
    <>
      <Meter
        name='Power'
        className={styles.meter}
        low={minPower}
        high={maxPower}
        value={rounded(totalPower)}
        unit='W'
      />
      <Meter
        name='Voltage'
        className={styles.meter}
        low={minVoltage}
        high={maxVoltage}
        value={rounded(totalVoltage)}
        unit='V'
      />
    </>
  )
}

function MaxPowerMeter({ maxPower, selectedSettings, fixtureVoltages }) {
  const totalCurrent = selectedSettings.map(
    (s) => s.current
  )
  const totalOutputPower = fixtureVoltages.map(
    (f, fIndex) => totalCurrent[fIndex] / 1000 * f
  ).reduce(
    (acc, curr) => acc + curr, 0
  )

  return (
    <>
      <Meter
        name='Driver total max power'
        low={0}
        high={maxPower}
        value={rounded(totalOutputPower)}
        unit='W'
      />
    </>
  )
}

export { MaxPowerMeter }
export default Meters
