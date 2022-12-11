import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './gameSuccess.module.scss'
import { playItem } from '../../types/playTypes'

interface props {
    resetFunction: () => void,
}

const GameSuccess = (props: props) => {

    return (
        <div className={s.screen}>
            <section className={s.section}>
                <div className={s.name}>Winner!</div>
                <button className={s.resetButton} onClick={() => props.resetFunction()}>Reset</button>
            </section>
        </div >
    );
}

export default GameSuccess;