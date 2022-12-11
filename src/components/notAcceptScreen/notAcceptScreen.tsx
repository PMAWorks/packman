import s from './notAcceptScreen.module.scss'

const NotAcceptScreen = () => {

    return (
        <div className={s.screen}>
            <section className={s.section}>
                <div className={s.ghost}>
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
                <div className={s.name}>Oops, looks like your device is not supported...</div>
                <div className={s.description}>The project is adapted for devices with a screen resolution of 1920 * 1080</div>
            </section>
        </div >
    );
}

export default NotAcceptScreen;