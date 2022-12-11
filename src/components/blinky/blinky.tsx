import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './blinky.module.scss'
import { packmanObject, playItem } from '../../types/playTypes'
import { findWay } from '../../functions/functions';

interface props {
    packmanPosition: packmanObject,
    playField: playItem[],
    setIsPackmanDead: Dispatch<SetStateAction<boolean>>,
    isPackmanDead: boolean,
}

const Blinky = (props: props) => {

    let [blinkyPosition, setBlinkyPosition] = useState({ top: 8, left: 8 })
    let [eyePosition, setEyePosition] = useState({ left: `3px`, top: `3px` })

    useEffect(() => { setBlinkyPosition({ top: 8, left: 8 }) }, [props.isPackmanDead])

    let getFunc = async () => {
        if (props.packmanPosition.direction == 'pause') return
        let index = blinkyPosition.top * 15 + blinkyPosition.left
        let packmanIndex = props.packmanPosition.top * 15 + props.packmanPosition.left

        await findWay(index, packmanIndex, props.playField, props.packmanPosition, blinkyPosition, setBlinkyPosition, setEyePosition, props.setIsPackmanDead)
    }

    useEffect(() => { getFunc() }, [props.packmanPosition])

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

export default Blinky;