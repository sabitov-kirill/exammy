// Sabitov Kirill, 6/5/2022

import { createSignal, onCleanup, onMount } from "solid-js";
import { JSXElement } from "solid-js";

import { tasksRecordsStore, initialTasksRecordState, tasksTreckerStore } from "./store";

export interface Subject {
    key: SubjectKey,
    name: string,
    tasksCount: number,
    description?: string,
    dateOfExam?: number,
    icon?: JSXElement
}

/**
 * Keys to be mapped to subjects objects
 */
export type SubjectKey = 'NAN' | 'INF' | 'MTH' | 'RUS';
export const subjectsKeys: SubjectKey[] = ['INF', 'MTH', 'RUS'];
export const isSubjectKey = (maybeSubjectKey: unknown): boolean => {
    const foundSubjectKey = subjectsKeys.indexOf(maybeSubjectKey as SubjectKey);
    return foundSubjectKey !== -1;
}

/**
 * Subjects objects mapper.
 */
const subjectsMap: Map<SubjectKey, Subject> = new Map([
    [ 'NAN',  { key: 'NAN', name: '',             tasksCount: 0  }, ],
    [ 'INF',  { key: 'INF', name: 'Информатика',  tasksCount: 27 }, ],
    [ 'MTH',  { key: 'MTH', name: 'Математика',   tasksCount: 18 }, ],
    [ 'RUS',  { key: 'RUS', name: 'Русский Язык', tasksCount: 27 }, ],
]);
export const getSubject = (subjectKey: SubjectKey): Subject => (subjectsMap.get(subjectKey)!)
export const subjects = Array.from(subjectsMap.values()).slice(1);

/**
 * Subject store creation function.
 */
export const createSubjectStore = () => {
    const [isSubjectSelected, setSubjectSelected] = createSignal(false);
    const [subjectKey, setSubjectKey] = createSignal<SubjectKey>('NAN');

    /**
     * Get current subject
     * @returns current subject
     */
    const subject = (): Subject => (
        subjectsMap.get(subjectKey())!
    )

    /**
     * Trying to find previously stored subject.
     * Is not found returns false.
     * If found try lo load previously saved tasks records of these subject.
     * @returns wheather previously saved subject was loaded or not.
     */
    const chooseStoredSubject = (): boolean => {
        const storedSubjectKey = localStorage.getItem('lastSubjectKey');
        if (!isSubjectKey(storedSubjectKey)) return false;
        changeSubject(storedSubjectKey as SubjectKey);
        return true;
    };
    
    /**
     * Save currently using subject to local storage.
     * So that can be restored after reload.
     */
    const saveCurrentSubject = () => {
        if (!isSubjectSelected()) return;
        localStorage.setItem('lastSubjectKey', subjectKey());
    };

    /**
     * Change currently using subject.
     * @param newSubjectKey key of choosing subject.
     */
    const changeSubject = (newSubjectKey: SubjectKey) => {
        // Cache current tracking session
        tasksTreckerStore.saveCurrentTasksData();
        tasksRecordsStore.saveCurrentTasksRecords();

        // Set new current object key
        setSubjectKey(newSubjectKey);
        setSubjectSelected(true);
        if (subjectKey() != 'NAN') {
            saveCurrentSubject();
        }

        // Load existing cached data
        tasksRecordsStore.loadStoredTasksRecords(newSubjectKey);
        tasksTreckerStore.loadStoredTasksData(newSubjectKey);
    };

    return {
        isSubjectSelected, subjectKey, subject,
        chooseStoredSubject, saveCurrentSubject, changeSubject, 
    }
}

export default createSubjectStore;