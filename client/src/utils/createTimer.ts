// Saitov Kirill, 6/6/2022

import { createStore, produce } from "solid-js/store";
import { ActivityState, createActivityState, ToggleActivityCallback } from "./createActivityState";

/**
 * Provides ability to handle duration of time period.
 */
export class Time {
    public raw: number;
    public seconds: number;
    public minutes: number;

    /**
     * Increment time by seconds. Automaticly handle seconds to minutes translation if neccessery.
     * @param seconds seconds count.
     */
    public addSeconds(seconds: number) {
        this.raw += seconds;
        let newSeconds = seconds + this.seconds;
        if (newSeconds >= 60) {
            this.seconds = newSeconds % 60;
            this.minutes += Math.floor(newSeconds / 60);
        } else {
            this.seconds = newSeconds;
        }
    }

    /**
     * Make string in format mm:ss.
     * @param time time to formate to string.
     * @returns formated time string.
     */
    public static makeString(time: Time) { return `
        ${time.minutes.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        })}:${time.seconds.toLocaleString('en-US', {
            minimumIntegerDigits: 2
        })}
    `}

    constructor(initialSeconds: number = 0, initialMinutes: number = 0) {
        this.raw = initialMinutes * 60 + initialSeconds;
        this.seconds = initialSeconds;
        this.minutes = initialMinutes;
    }
}

export type TimerCallback = ToggleActivityCallback & { onTimer?: () => void } 

/**
 * Creates timer, which count time when its state is 'started'.
 * @returns timer.
 */
export const createTimer = (incrementInnerTime: boolean = true) => {
    const { state, toggleState, forceSetState } = createActivityState();
    const [time, setTime] = createStore(new Time());
    let timerHandle: number;

    /**
     * Toggle timer state: 'notStarted' -> 'started' -> 'ended'.
     * If state is 'started' counts time.
     */
    const toggleTimer = (callback?: TimerCallback) => toggleState({
        onStarted: () => {
            timerHandle = setInterval(() => {
                setTime(produce(time => {
                    if (callback?.onTimer) callback?.onTimer();
                    if (incrementInnerTime) time.addSeconds(1);
                }));
            }, 1000);
            if (callback?.onStarted) callback?.onStarted();
        },
        onEnded: () => {
            clearInterval(timerHandle);
            if (callback?.onEnded) callback?.onEnded();
        }
    });

    /**
     * Resets all timer parametrs.
     */
    const reset = () => {
        clearInterval(timerHandle);
        forceSetState('notStarted');
        setTime({ seconds: 0, minutes: 0, raw: 0 });
    }

    /**
     * Force set all timer parametrs.
     * @param time passed time.
     * @param state timer state.
     */
    const set = (time: Time, state: ActivityState) => {
        forceSetState(state);
        setTime(new Time(time.seconds, time.minutes));

        switch(state) {            
            case 'started':
                timerHandle = setInterval(() => {
                    setTime(produce(time => {
                        time.addSeconds(1)
                    }));
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