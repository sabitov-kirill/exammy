// Saitov Kirill, 3/6/2022

import { createStore, produce } from 'solid-js/store';
import { createRoot, createSignal } from 'solid-js';

import { Time } from './time'
import { isSubjectKey, subject, SubjectKey } from './subjects'

export interface TaskRecord {
    startDate: Date,
    duration: Time,
    isCorrect?: boolean
}

export interface TaskRecords {
    records: Array<TaskRecord>,
    minDuration: number, 
    maxDuration: number,
    avgDuration: number,
    sumDuration: number,
    correctCount?: number
}

const initialTasksRecordState = (count: number): TaskRecords[] => {
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

function createProgressTrackingStore() {
    /**
     * Subject handle
     */
    const [isSubjectSelected, setSubjectSelected] = createSignal(false);
    const [subjectKey, setSubjectKey] = createSignal<SubjectKey>('NAN');

    const chooseStoredSubject = (): boolean => {
        const lastSubjectString = localStorage.getItem('lastSubjectName');
        if (!isSubjectKey(lastSubjectString)) return false;
        const lastSubjectKey = lastSubjectString as SubjectKey;
    
        setSubjectKey(lastSubjectKey);
        setSubjectSelected(true);

        const storedProgress = localStorage.getItem(lastSubjectKey);
        setTasksRecords(
            storedProgress === null ? 
            initialTasksRecordState(subject(lastSubjectKey).tasksCount) :
            JSON.parse(storedProgress)
        );

        return true;
    }
    
    const saveLastSubject = () => {
        if (!isSubjectSelected()) throw new Error('Trying to save unset subject.');
        localStorage.setItem('lastSubjectName', subjectKey());
    }

    const changeSubject = (newSubjectKey: SubjectKey) => {
        setSubjectKey(newSubjectKey);
        setSubjectSelected(true);
        saveLastSubject();

        const storedProgress = localStorage.getItem(subjectKey());
        setTasksRecords(
            storedProgress === null ? 
            initialTasksRecordState(subject(newSubjectKey).tasksCount) :
            JSON.parse(storedProgress)
        );
    };

    /**
     * Tasks records handle
     */
    const [tasksRecords, setTasksRecords] = createStore<Array<TaskRecords>>(
        new Array<TaskRecords>()
    );
    chooseStoredSubject();

    const addTaskRecord = (taskNumber: number, newTaskRecord: TaskRecord) => {
        if (!isSubjectSelected()) throw new Error('Trying to make record of the task of not selected subject.');

        setTasksRecords(taskNumber,
            produce((taskRecords) => {
                taskRecords.records.push(newTaskRecord);

                const duration = Time.makeInt(newTaskRecord.duration);
                taskRecords.sumDuration += duration;
                taskRecords.minDuration = Math.min(taskRecords.minDuration, duration);
                taskRecords.maxDuration = Math.max(taskRecords.maxDuration, duration);
                taskRecords.avgDuration = taskRecords.sumDuration / taskRecords.records.length;
            })
        )

        localStorage.setItem(subjectKey(), JSON.stringify(tasksRecords));
    };

    return {
        tasksRecords, addTaskRecord,
        isSubjectSelected, subjectKey,
        chooseStoredSubject, saveLastSubject, changeSubject, 
    };
}

export default createRoot(createProgressTrackingStore);