import {useState, useEffect} from 'react';
import './timer.scss';
import {getRemainingTimeUntilMsTimestamp} from './days';
import "../../../../App.scss"

const defaultRemainingTime = {
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00'
}

const CountdownTimer = ({countdownTimestampMs}) => {
    const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            updateRemainingTime(countdownTimestampMs);
        }, 1000);
        return () => clearInterval(intervalId);
    },[countdownTimestampMs]);

    function updateRemainingTime(countdown) {
        setRemainingTime(getRemainingTimeUntilMsTimestamp(countdown));
    }

    return(
        <div className="countdown-timer">
            <span className="format_color">{remainingTime.days}</span>
            <span className="format_color">:</span>
            <span className="format_color">{remainingTime.hours}</span>
            <span className="format_color">:</span>
            <span className="format_color">{remainingTime.minutes}</span>
            <span className="format_color">:</span>
            <span className="format_color">{remainingTime.seconds}</span>
            
        </div>
    );
}

export default CountdownTimer;