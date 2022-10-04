import { useState, useEffect, useCallback } from 'react'
import reactLogo from './assets/react.svg'
import Music from './assets/music_sample.wav'
import useSound from 'use-sound'
import { DateTime } from 'luxon'
import './App.css'

function App() {
  const [play , {stop}] = useSound(Music)
  const [musicStart, setMusicStart] = useState(false)
  const [timer, setTimer] = useState<DateTime>()
  const [now, setNow] = useState(DateTime.fromJSDate(new Date()))
  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = DateTime.fromJSDate(new Date())
      setNow(newNow)
      if (newNow.toUnixInteger() === timer?.toUnixInteger()) {
        play()
        setMusicStart(true)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [timer, play])



  const handleChangeTimer = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTimer(DateTime.fromFormat(e.target.value, 'HH:mm'))
  }, [])

  const handleStop = useCallback(() => {
    stop()
    setMusicStart(false)
    setTimer(undefined)
  }, [stop])

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="./vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Sound Timer Demo</h1>
      <div className="card">
        <p>
          { now.toFormat('yyyy/MM/dd HH:mm:ss') }
        </p>
        {timer && <p>
          music start at { timer?.toFormat('yyyy/MM/dd HH:mm:ss') }
        </p>}
      </div>
      <div>
        {!timer && <p>please set timer</p>}
        <input type="time" onChange={handleChangeTimer}/>
      </div>
      { musicStart &&
        <div>
          <button onClick={handleStop}>
            stop
          </button>
        </div>
      }
    </div>
  )
}

export default App
