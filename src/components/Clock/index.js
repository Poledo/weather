import React from 'react'
import styles from './Clock.module.css'

function Clock({ time }) {
  return (
    <>
      {time && (
        <div className={styles.clock}>
          <div
            className={styles.hour_hand}
            style={{
              transform: `rotateZ(${time.getHours() * 30}deg)`,
            }}
          />
          <div
            className={styles.min_hand}
            style={{
              transform: `rotateZ(${time.getMinutes() * 6}deg)`,
            }}
          />
          <div
            className={styles.sec_hand}
            style={{
              transform: `rotateZ(${time.getSeconds() * 6}deg)`,
            }}
          />
          <span className={styles.twelve}>12</span>
          <span className={styles.one}>1</span>
          <span className={styles.two}>2</span>
          <span className={styles.three}>3</span>
          <span className={styles.four}>4</span>
          <span className={styles.five}>5</span>
          <span className={styles.six}>6</span>
          <span className={styles.seven}>7</span>
          <span className={styles.eight}>8</span>
          <span className={styles.nine}>9</span>
          <span className={styles.ten}>10</span>
          <span className={styles.eleven}>11</span>
        </div>
      )}
    </>
  )
}

export default Clock
