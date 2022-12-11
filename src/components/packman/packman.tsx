import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './packman.module.scss'
import { playItem } from '../../types/playTypes'

interface props {
    score: number,
    setScore: Dispatch<SetStateAction<number>>
    playField: playItem[],
    setIsPackmanWin: Dispatch<SetStateAction<boolean>>,
    setPlayField: Dispatch<SetStateAction<playItem[]>>
    setPackmanPosition: Dispatch<SetStateAction<{ top: number, left: number, direction: string }>>,
    isPackmanDead: boolean
}

const Packman = (props: props) => {

    let [packmanPosition, setPackmanPosition] = useState({ top: 0, left: 0, direction: 'pause' })

    let packmanManagment = (key: string) => {
        switch (key) {
            case 'ArrowRight': {
                setPackmanPosition((packmanPosition) => ({ ...packmanPosition, direction: 'right' }))
                break
            }
            case 'ArrowUp': {
                setPackmanPosition((packmanPosition) => ({ ...packmanPosition, direction: 'top' }))
                break
            }
            case 'ArrowLeft': {
                setPackmanPosition((packmanPosition) => ({ ...packmanPosition, direction: 'left' }))
                break
            }
            case 'ArrowDown': {
                setPackmanPosition((packmanPosition) => ({ ...packmanPosition, direction: 'down' }))
                break
            }
            case ' ': {
                setPackmanPosition((packmanPosition) => ({ ...packmanPosition, direction: 'pause' }))
                break
            }
            default: { }
        }
    }

    let [intervalID, setintervalID] = useState<any>()

    useEffect(() => {
        if (props.isPackmanDead) { clearInterval(intervalID) }
    }, [props.isPackmanDead])

    useEffect(() => {
        if (!props.isPackmanDead) {
            setintervalID(setInterval(() => {
                setPackmanPosition((packmanPosition) => {
                    let left = packmanPosition.left
                    let top = packmanPosition.top
                    switch (packmanPosition.direction) {
                        case 'top': {
                            top--
                            break
                        }
                        case 'right': {
                            left++
                            break
                        }
                        case 'down': {
                            top++
                            break
                        }
                        case 'left': {
                            left--
                            break
                        }
                    }
                    let index = top * 15 + left
                    if (props.playField[index] && props.playField[index].type == 'BLOCK') {
                        props.setPackmanPosition({ top: packmanPosition.top, left: packmanPosition.left, direction: packmanPosition.direction })
                        return ({ ...packmanPosition })
                    }
                    else if (top > 14 || top < 0 || left < 0 || left > 14) {
                        props.setPackmanPosition({ top: packmanPosition.top, left: packmanPosition.left, direction: packmanPosition.direction })
                        return ({ ...packmanPosition })
                    }
                    else {
                        if (props.playField[index].type == 'berry') {
                            setTimeout(() => {
                                let newField = [...props.playField]
                                newField[index].type = 'notBerry'
                                props.setPlayField(newField)
                                props.setScore((score) => {
                                    if (score + 1 >= 136) props.setIsPackmanWin(true)
                                    return score + 1
                                })
                            }, 300)
                        }
                        props.setPackmanPosition({ top: top, left: left, direction: packmanPosition.direction })
                        return ({ ...packmanPosition, top: top, left: left })
                    }
                })
            }, 500))
        }
        else { clearInterval(intervalID) }
        document.addEventListener('keydown', (e) => packmanManagment(e.key))
        return () => {
            clearInterval(intervalID)
            document.removeEventListener('keydown', (e) => packmanManagment(e.key))
        }
    }, [props.isPackmanDead])

    let getRotate = () => {
        switch (packmanPosition.direction) {
            case 'top': return 'rotate(270deg)'
            case 'down': return 'rotate(90deg)'
            case 'left': return 'rotate(0deg) scale(-1, 1)'
            case 'right': return 'rotate(0deg)'
        }
    }

    useEffect(() => {
        setPackmanPosition({ top: 0, left: 0, direction: 'pause' })
    }, [props.isPackmanDead])

    return (
        <div className={s.packman} style={{ transform: `translateY(${packmanPosition.top * 60}px) translateX(${packmanPosition.left * 60}px)` }}>
            <div style={{ transform: getRotate(), position: 'relative' }}>
                <div className={packmanPosition.direction == 'pause' ? s.pacmanTopWithoutAnim : s.pacmanTop} >
                    <div className={s.eye}>
                        <div className={s.eyebrow}></div>
                        <div className={s.eyeDot}></div>
                    </div>
                </div>
                <div className={packmanPosition.direction == 'pause' ? s.pacmanBottomWithoutAnim : s.pacmanBottom}></div>
            </div>
        </div>
    );
}

export default Packman;
