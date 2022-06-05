// saitov Kirill, 3/6/2022

import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";

import { Time } from './time';

export type TimerState = 'notStarted' | 'started' | 'ended';
export interface ITimer {
    timerState: TimerState,
    time: Time,
}
export interface Timer  {
    timerState: () => TimerState,
    toggleTimerState: () => void,
    time: Time,
    reset: () => void,
    set: (timer: ITimer) => void
};

export const useTimer = (onTimerStop: (time: Time) => void): Timer => {
    const [timerState, setTimerState] = createSignal<TimerState>('notStarted');
    const [time, setTime] = createStore(new Time());
    let timerHandle: number;

    const toggleTimerState = () => setTimerState((currentState) => {
        switch(currentState) {
            case 'notStarted':
                timerHandle = setInterval(() => {
                    setTime(produce(time => {
                        time.addSeconds(1)
                    }));
                }, 1000);
                return 'started';

            case 'started':
                clearInterval(timerHandle);
                onTimerStop(time);
                return 'ended';

            case 'ended':
                return 'ended';
        }
    });

    const reset = () => {
        clearInterval(timerHandle);
        setTimerState('notStarted');
        setTime({ seconds: 0, minutes: 0 });
    }

    const set = (timer: ITimer) => {
        setTimerState(timer.timerState);
        setTime(timer.time);

        switch(timer.timerState) {            
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
        timerState,
        toggleTimerState,
        time,
        reset,
        set
    }
}