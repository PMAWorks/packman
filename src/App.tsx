import { useEffect, useState } from 'react';
import './App.scss';
import Packman from './components/packman/packman';
import Blinky from './components/blinky/blinky';
import { playItem } from './types/playTypes'
import Pinky from './components/pinky/pinky';
import Inky from './components/inky/inky';
import GameOver from './components/gameOver/gameOver';
import GameSuccess from './components/gameSuccess/gameSuccess';
import NotAcceptScreen from './components/notAcceptScreen/notAcceptScreen';

function App() {

  let startField = [
    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK' }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },

    { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK' }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', },

    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK' }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },
    { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'BLOCK', }, { type: 'berry', },
    { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'BLOCK' }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', }, { type: 'berry', },
  ]

  let [playField, setPlayField] = useState<playItem[]>(startField)
  let [score, setScore] = useState<number>(0)
  let [isPackmanWin, setIsPackmanWin] = useState<boolean>(false)
  let [packmanPosition, setPackmanPosition] = useState({ top: 0, left: 0, direction: 'pause' })
  let [isPackmanDead, setIsPackmanDead] = useState<boolean>(false)
  let [isDeviceNotAccept, setIsDeviceNotAccept] = useState(false)

  let resetFunction = () => {
    let newField = [...startField]
    setPlayField(newField)
    setIsPackmanDead(false)
    setIsPackmanWin(false)
    setScore(0)
  }

  useEffect(() => {
    if (window.innerWidth < 1800 || window.innerWidth < 1000) setIsDeviceNotAccept(true)
  }, [])

  return (
    <div className='app'>
      {isPackmanDead ? <GameOver resetFunction={resetFunction} /> : null}
      {isPackmanWin ? <GameSuccess resetFunction={resetFunction} /> : null}
      {isDeviceNotAccept ? <NotAcceptScreen /> : null}
      <div className='field'>
        <div className='infoBlock'>
          <div className='logoContainer'>

            <h1 className='logo'>PACKMAN</h1>

            <div className={'ghost'}>
              <div className={'ghead'}></div>
              <div className={'geyes'}>
                <div className={'geye'}>
                  <div className={'geyebrowLeft'}></div>
                  <div className={'geyeDot'}></div>
                </div>
                <div className={'geye'}>
                  <div className={'geyebrowRight'} ></div>
                  <div className={'geyeDot'}></div>
                </div>
              </div>
              <div className={'gbottom'}></div>
            </div>

          </div>

          <h2 className='score'>Score: {score}</h2>

          <div className='controlBlock'>
            <h2 className='control'>Control:</h2>
            <div className='keyDescription'>&#91; &#8593; &#93; &#8212; moving up </div>
            <div className='keyDescription'>&#91; &#8594; &#93; &#8212; moving right</div>
            <div className='keyDescription'>&#91; &#8595; &#93; &#8212; moving bottom</div>
            <div className='keyDescription'>&#91; &#8592; &#93; &#8212; moving left</div>
            <div className='keyDescription'>&#91; SPACE &#93; &#8212; pause</div>
            {/* <div className='keyDescription'>&#91; ESC &#93; &#8212; restart</div> */}
          </div>
        </div>
        <div className='playBlock'>
          <div className='playField'>
            <Packman playField={playField} setIsPackmanWin={setIsPackmanWin} score={score} setScore={setScore} setPlayField={setPlayField} setPackmanPosition={setPackmanPosition} isPackmanDead={isPackmanDead} />
            <Blinky packmanPosition={packmanPosition} playField={playField} setIsPackmanDead={setIsPackmanDead} isPackmanDead={isPackmanDead} />
            <Pinky packmanPosition={packmanPosition} playField={playField} setIsPackmanDead={setIsPackmanDead} isPackmanDead={isPackmanDead} />
            <Inky packmanPosition={packmanPosition} playField={playField} setIsPackmanDead={setIsPackmanDead} isPackmanDead={isPackmanDead} />
            {playField.map((item: playItem, index) => {
              switch (item.type) {
                case 'berry': {
                  return (
                    <div className='block'>
                      <div className='berry'>
                        <div className='tree'></div>
                        <div className='leaf'></div>
                      </div>
                    </div>
                  )
                }
                case 'notBerry': {
                  return (
                    <div className='block'></div>
                  )
                }
                case 'BLOCK': {
                  return (
                    <div className='blockBlock'></div>
                  )
                }
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
