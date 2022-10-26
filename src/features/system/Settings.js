import React from 'react'
import Meters from './Meters'
import styles from './Settings.module.css'

function Settings({selectedSettings, outputs, settings, changeSetting}) {
  return (
    <div className={styles.outputList}>
      {outputs.map((output, index) => (
        <div key={index} className={styles.setting}>
          <p>Ch. {index + 1}</p>
          {settings.map(setting => (
            <label key={setting.current}>
              <input
                type="radio"
                value={setting.current}
                checked={setting.current === selectedSettings[index].current}
                onChange={e => changeSetting(index, setting.current)}
              />
              {setting.current} mA
            </label>
          ))}
          <Meters index={index} />
        </div>

      ))}
    </div>
  )
}

export default Settings
