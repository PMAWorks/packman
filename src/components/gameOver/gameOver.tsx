import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import s from './gameOver.module.scss'
import { playItem } from '../../types/playTypes'

interface props {
    resetFunction: () => void,
}

const GameOver = (props: props) => {

    return (
        <div className={s.screen}>
            <section className={s.section}>
                <div className={s.name}>Game over!</div>
                <button className={s.resetButton} onClick={props.resetFunction}>Reset</button>
            </section>
        </div >
    );
}

export default GameOver;