// Sabitov Kirill, 6/5/2022

import { createEffect, createMemo, createRoot, createSignal, onCleanup } from "solid-js";
import { createStore } from "solid-js/store";

import { Time } from "../stores/time";
import { Timer, useTimer } from "../stores/useTimer";
import progressStore from "./progressStore";
import { subject } from "./subjects";

const initialTimersState = (tasksNumbers: number[]) => (
    tasksNumbers.map((task) => (
        useTimer((time: Time) => {
            progressStore.addTaskRecord(task, { 
                startDate: new Date(),
                duration: time
            });
        })
    ))
)

const createProgressTracker = () => {
    const [taskInWorkNumber, setTaskInWorkNumber] = createSignal(-1);
    const tasksNumbers = createMemo(() => (
        [...Array(subject(progressStore.subjectKey()) .tasksCount).keys()]
    ));

    const [timers, setTimers] = createStore(new Array<Timer>());

    createEffect(() => {
        setTaskInWorkNumber(-1);
        setTimers(initialTimersState(tasksNumbers()))
    });

    return ({
        taskInWorkNumber,
        setTaskInWorkNumber,
        tasksNumbers,
        timers
    });
}

export default createRoot(createProgressTracker)