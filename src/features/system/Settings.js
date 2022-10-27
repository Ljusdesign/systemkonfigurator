import React from 'react'
import Select from 'react-select'
import Meters from './Meters'
import styles from './Settings.module.css'

const makeLabel = current => current + ' mA'

const getOptions = (index, settings, changeSetting) => (
  settings.map(op => ({
    value: op.current,
    isOptionSelected: op.current === op.current,
    label: makeLabel(op.current),
    onChange: () => changeSetting(index, op.current),
  }))
)

function Settings({ selectedSettings, outputs, settings, changeSetting }) {
  return (
    <div className={styles.outputList}>
      {outputs.map((output, index) => (
        <div key={index}>
          <p>Ch. {index + 1}</p>
          <Select
            options={getOptions(index, settings, changeSetting)}
            defaultValue={{
              value: selectedSettings[index].current,
              label: makeLabel(selectedSettings[index].current),
            }}
            onChange={(event) => changeSetting(index, event)}
          />
          <Meters index={index} />
        </div>
      )
      )}
    </div>
  )
}

export default Settings
