import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './inky.module.scss'
import { packmanObject, playItem } from '../../types/playTypes'
import { findWay } from '../../functions/functions';

interface props {
    packmanPosition: packmanObject,
    playField: playItem[],
    setIsPackmanDead: Dispatch<SetStateAction<boolean>>,
    isPackmanDead: boolean,
}

const Inky = (props: props) => {

    let [blinkyPosition, setBlinkyPosition] = useState({ top: 6, left: 8 })
    let [eyePosition, setEyePosition] = useState({ left: `3px`, top: `3px` })

    useEffect(() => {
        setBlinkyPosition({ top: 6, left: 8 })
    }, [props.isPackmanDead])

    let getFunc = async () => {
        if (props.packmanPosition.direction == 'pause') return
        let index = blinkyPosition.top * 15 + blinkyPosition.left

        let packmanTop = props.packmanPosition.top
        let packmanLeft = props.packmanPosition.left
        if (Math.abs(packmanTop - blinkyPosition.top) > 2 || Math.abs(packmanLeft - blinkyPosition.left) > 2) {
            switch (props.packmanPosition.direction) {
                case 'top': {
                    if (packmanTop < 12 && props.playField[(packmanTop + 3) * 15 + packmanLeft].type != 'BLOCK') packmanTop = packmanTop + 3
                    break
                }
                case 'down': {
                    if (packmanTop > 2 && props.playField[(packmanTop - 3) * 15 + packmanLeft].type != 'BLOCK') packmanTop = packmanTop - 3
                    break
                }
                case 'left': {
                    if (packmanLeft < 12 && props.playField[packmanTop * 15 + packmanLeft + 3].type != 'BLOCK') packmanLeft = packmanLeft + 3
                    break
                }
                case 'right': {
                    if (packmanLeft > 2 && props.playField[packmanTop * 15 + packmanLeft - 3].type != 'BLOCK') packmanLeft = packmanLeft - 3
                    break
                }
            }
        }
        let needIndex = packmanTop * 15 + packmanLeft

        await findWay(index, needIndex, props.playField, props.packmanPosition, blinkyPosition, setBlinkyPosition, setEyePosition, props.setIsPackmanDead)
    }

    useEffect(() => {
        getFunc()
    }, [props.packmanPosition])

    return (
        <div className={s.ghost} style={{ transform: `translateY(${blinkyPosition.top * 60}px) translateX(${blinkyPosition.left * 60}px)` }}>
            <div className={s.head}></div>
            <div className={s.eyes}>
                <div className={s.eye}>
                    <div className={s.eyebrowLeft}></div>
                    <div className={s.eyeDot} style={{ top: eyePosition.top, left: eyePosition.left }}></div>
                </div>
                <div className={s.eye}>
                    <div className={s.eyebrowRight} ></div>
                    <div className={s.eyeDot} style={{ top: eyePosition.top, left: eyePosition.left }}></div>
                </div>
            </div>
            <div className={s.bottom}></div>
        </div>
    );
}

export default Inky;