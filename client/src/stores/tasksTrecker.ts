// Sabitov Kirill, 6/6/2022

import { createSignal } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { succesSubmitRecordsNotify, zeroRecordsOnSubmittionNotify } from "../components/Feedback";

import { ActivityState } from "../utils/createActivityState";
import { createBoolean } from "../utils/createBoolean";
import { createTimer, Time } from "../utils/createTimer";
import { subjectStore, tasksRecordsStore } from "./store";
import { getSubject, SubjectKey } from "./subject";
import { TaskRecord } from "./tasksRecords";

export interface TaskData {
    state: ActivityState,
    record: TaskRecord,
}

/**
 * Create initial value of trecking EGE variant tasks data.
 * @param count count of records in creating tasks records array.
 * @returns initialised woth default values array of records.
 */
 export const initialTasksData = (count: number): TaskData[] => {
    let data = new Array<TaskData>(count);

    for (let i = 0; i < count; i++)
    data[i] = {
            state: 'notStarted',
            record: {
                duration: new Time(),
                startDate: new Date(),
            }
        };
    return data;
}

/**
 * Create EGE variant tasks trecker store.
 * @returns tasks trecker store.
 */
const createTasksTracker = () => {
    const timer = createTimer();

    const [isSubmited, toggleSubmittion] = createBoolean();
    const [currentTask, setCurrentTask] = createSignal(-1);
    const [tasksData, setTasksData] = createStore(
        new Array<TaskData>()
    );

    /**
     * Load from local storage previously saved EGE variant tasks trecker.
     * @param SubjectKey key of subject to load.
     */
     const loadStoredTasksData = (subjectKey: SubjectKey) => {
        // Reset timer 
        timer.reset();

        // Load stored tasks trecking data
        const storedDataString = localStorage.getItem('variantTreck' + subjectKey);
        if (storedDataString === null) {
            setTasksData(initialTasksData(getSubject(subjectKey).tasksCount));
            return;
        }

        const storedData = JSON.parse(storedDataString);
        if (!Array.isArray(storedData) ||
            storedData.length != getSubject(subjectKey).tasksCount) {
            setTasksData(initialTasksData(getSubject(subjectKey).tasksCount));
            localStorage.removeItem('variantTreck' + subjectKey);
            return;
        }
        setTasksData(storedData);

        // Load task work state and set timer if neccessery
        const storedCurrentTaskString = localStorage.getItem('variantTreckTask' + subjectKey);
        if (storedCurrentTaskString === null) {
            setCurrentTask(-1);
            return;
        }

        let storedCurrentTask = parseInt(storedCurrentTaskString);
        storedCurrentTask = storedCurrentTask >= -1 ? storedCurrentTask : -1;
        if (storedCurrentTask > -1) {
            const time = tasksData[storedCurrentTask].record.duration;
            timer.set(new Time(time.seconds, time.minutes), 'started');
            setTasksData(produce((taskData) => {
                taskData[storedCurrentTask].record.duration = timer.time;
            }));
        }
        setCurrentTask(storedCurrentTask);
    };

    /**
     * Save curretn tasks records to local storage.
     */
    const saveCurrentTasksData = () => {
        if (Array.isArray(tasksData) &&
            tasksData.length == subjectStore.subject().tasksCount) {
            localStorage.setItem(
                'variantTreckTask' + subjectStore.subjectKey(),
                currentTask().toString()
            );
            localStorage.setItem(
                'variantTreck' + subjectStore.subjectKey(),
                JSON.stringify(tasksData)
            );
        }
    }

    /**
     * Resets all tasks tracker data.
     */
    const restart = () => {
        if (isSubmited()) toggleSubmittion();
        setTasksData(initialTasksData(subjectStore.subject().tasksCount));
        setCurrentTask(-1);
        timer.reset();

        saveCurrentTasksData();
    }

    /**
     * Submit all tasks records and add it to statistics.
     */
    const submit = () => {
        let endedTasksCount = 0;
        tasksData.forEach((taskTrack, index) => {
            if (taskTrack.state == 'ended') {
                tasksRecordsStore.addTaskRecord(index, taskTrack.record);
                endedTasksCount++;
            }
        })
        if (endedTasksCount > 0) {
            restart();
            succesSubmitRecordsNotify();
            tasksRecordsStore.saveCurrentTasksRecords();
        } else {
            zeroRecordsOnSubmittionNotify();
        }
    }

    /**
     * Task action handle function.
     * @param index task index.
     */
    const taskAction = (index: number) =>  {
        if (currentTask() == -1) {
            setTasksData(produce((taskData) => {
                taskData[index].state = 'started';
                taskData[index].record.duration = timer.time;
            }));
            setCurrentTask(index);
            timer.set(new Time(), 'started');
        } else if (currentTask() == index) {
            setTasksData(produce((taskData) => {
                taskData[currentTask()].state = 'ended';
                taskData[currentTask()].record.startDate = new Date();
                taskData[currentTask()].record.duration = new Time(timer.time.seconds, timer.time.minutes);
            }));

            setCurrentTask(-1);
            timer.set(new Time(), 'notStarted');
        }

        saveCurrentTasksData();
    }

    return {
        loadStoredTasksData, saveCurrentTasksData,
        restart, submit, isSubmited,
        currentTask, tasksData, taskAction
    }
}

export default createTasksTracker;