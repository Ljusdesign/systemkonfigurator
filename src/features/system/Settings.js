import React from 'react'
import Select from 'react-select'
import Meters from './Meters'
import styles from './Settings.module.css'

const makeLabel = current => current + ' mA'
const getOptions = (settings) => (
  settings.map(op => ({
    value: op.current,
    label: makeLabel(op.current),
  }))
)

function Settings({ selectedSettings, outputs, settings, changeSetting }) {
  const options = getOptions(settings)
  return (
    <div className={styles.outputList}>
      {outputs.map((output, index) => (
        <div key={JSON.stringify({...selectedSettings, index})}>
          <p>Ch. {index + 1}</p>
          <Select
            options={options}
            defaultValue={options.filter(o => o.value === selectedSettings[index].current)}
            onChange={(e) => changeSetting(index, e)}
          />
          <Meters index={index} />
        </div>
      ))}
    </div>
  )
}

export default Settings
