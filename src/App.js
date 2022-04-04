import Bmi from './components/Bmi'
import Weather from './components/Weather'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.container}>
      <Weather />
      <Bmi />
    </div>
  )
}

export default App
