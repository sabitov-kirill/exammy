// SAbitov Kirill, 6/6/2022

import { createStore, produce } from "solid-js/store";

import { Time } from "../utils/createTimer";
import { subjectStore } from './store';
import { getSubject, SubjectKey, subjects } from "./subject";
export interface TaskRecord {
    startDate: Date,
    duration: Time,
    isCorrect?: boolean
}

export interface TaskRecords {
    records: Array<TaskRecord>,
    correctCount?: number,
    minDuration: number, 
    maxDuration: number,
    avgDuration: number,
    sumDuration: number,
}

/**
 * Create initial value of tasks records array.
 * @param count count of records in creating tasks records array.
 * @returns initialised woth default values array of records.
 */
export const initialTasksRecordState = (count: number): TaskRecords[] => {
    let records = new Array<TaskRecords>(count);

    for (let i = 0; i < count; i++)
        records[i] = {
            records: new Array<TaskRecord>(),
            minDuration: Number.MAX_SAFE_INTEGER,
            maxDuration: 0,
            avgDuration: 0,
            sumDuration: 0,
        };

    return records;
}

/**
 * Create tasks records store.
 * @returns tasks records store.
 */
const createTasksStore = () => {
    const [tasksRecords, setTasksRecords] = createStore<Array<TaskRecords>>(
        new Array<TaskRecords>()
    );

    /**
     * Load from local storage previously saved tasks records.
     * @param SubjectKey key of subject to load.
     */
     const loadStoredTasksRecords = (subjectKey: SubjectKey) => {
        const storedDataString = localStorage.getItem('variantRecords' + subjectKey);
        if (storedDataString === null) {
            setTasksRecords(initialTasksRecordState(getSubject(subjectKey).tasksCount));
            return;
        }

        const storedRecords = JSON.parse(storedDataString);
        if (!Array.isArray(storedRecords) ||
            storedRecords.length != getSubject(subjectKey).tasksCount) {
            setTasksRecords(initialTasksRecordState(getSubject(subjectKey).tasksCount));
            localStorage.removeItem('variantRecords' + subjectKey);
            return;
        }

        setTasksRecords(storedRecords);
    };

    /**
     * Save curretn tasks records to local storage.
     */
    const saveCurrentTasksRecords = () => {
        if (Array.isArray(tasksRecords) &&
            tasksRecords.length == subjectStore.subject().tasksCount) {
            localStorage.setItem(
                'variantRecords' + subjectStore.subjectKey(),
                JSON.stringify(tasksRecords)
            );
        }
    }

    /**
     * Add record both to local storage and to store.
     * @param taskNumber number of task in EGE variant.
     * @param newTaskRecord records of task execution.
     * @returns index of added task in store.
     */
    const addTaskRecord = (taskNumber: number, newTaskRecord: TaskRecord): number => {
        if (!subjectStore.isSubjectSelected())
            throw new Error('Trying to make record of the task of not selected subject.');

        let recordId: number = tasksRecords.length;
        setTasksRecords(taskNumber, produce((taskRecords) => {
            taskRecords.records.push(newTaskRecord);

            const duration = newTaskRecord.duration.raw;
            taskRecords.sumDuration += duration;
            taskRecords.minDuration = Math.min(taskRecords.minDuration, duration);
            taskRecords.maxDuration = Math.max(taskRecords.maxDuration, duration);
            taskRecords.avgDuration = taskRecords.sumDuration / taskRecords.records.length;
        }))
        return recordId;
    };

    return {
        tasksRecords, addTaskRecord,
        loadStoredTasksRecords, saveCurrentTasksRecords
    };
}

export default createTasksStore;