// Saitov Kirill, 6/6/2022

import { useState } from "react";
import { 
    ActivityState,
    ToggleActivityCallback,
    useActivityState,
} from "./useActivityState";

export type { ActivityState } from './useActivityState';
export type TimerCallback = ToggleActivityCallback & { onTimer?: () => void };

/** Create string in format mm:ss from seconds.
 * @param time time in seconds.
 * @returns formated string.
 */
export const MMSSTimeString = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    return minutesStr + ':' + secondsStr;
}

/** Create string in format hh:mm:ss from seconds.
 * @param time time in seconds.
 * @returns formated string.
 */
 export const HHMMSSTimeString = (time: number) => {
    const hours   = Math.floor(time / 3600);
    const minutes = Math.floor((time - (hours * 3600)) / 60);
    const seconds = time - (hours * 3600) - (minutes * 60);
    const hoursStr = hours < 10 ? '0' + hours : hours;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    const secondsStr = seconds < 10 ? '0' + seconds : seconds;
    return hoursStr + ':' + minutesStr + ':' + secondsStr;
}

/**
 * Creates timer, which count time when its state is 'started'.
 * @returns timer hook.
 */
export const useTimer = (incrementInnerTime: boolean = true) => {
    const { toggleState, forceSetState } = useActivityState();
    const [time, setTime] = useState<number>(0);
    let timerHandle: NodeJS.Timer;

    /**
     * Toggle timer state: 'notStarted' -> 'started' -> 'ended'.
     * If state is 'started' counts time.
     */
    const toggleTimer = (callback?: TimerCallback) => toggleState({
        onStarted: () => {
            timerHandle = setInterval(() => {
                if (incrementInnerTime) setTime(time => time + 1);
                if (callback?.onTimer) callback?.onTimer();
            }, 1000);
            if (callback?.onStarted) callback?.onStarted();
        },
        onEnded: () => {
            clearInterval(timerHandle);
            if (callback?.onEnded) callback?.onEnded();
        }
    });

    /** Resets all timer parametrs. */
    const reset = () => {
        clearInterval(timerHandle);
        forceSetState('notStarted');
        setTime(0);
    }

    /**
     * Force set all timer parametrs.
     * @param time passed time.
     * @param state timer state.
     */
    const set = (time: number, state: ActivityState, callback?: TimerCallback) => {
        forceSetState(state);
        setTime(time);

        switch(state) {            
            case 'started':
                timerHandle = setInterval(() => {
                    if (incrementInnerTime) setTime(time => time + 1);
                    if (callback?.onTimer) callback?.onTimer();
                }, 1000);
                break;
            case 'notStarted':
            case 'ended':
                clearInterval(timerHandle);
                break;
        }
    }

    return {
        reset, set,
        toggleTimer,
        time,
    }
}