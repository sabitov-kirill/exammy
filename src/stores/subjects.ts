// Sabitov Kirill, 6/4/2022

import { JSXElement } from "solid-js";

export interface Subject {
    name: string,
    tasksCount: number,
    description?: string,
    dateOfExam?: number,
    icon?: JSXElement
}

export type SubjectKey = 'NAN' | 'INF' | 'MTH' | 'RUS';
export const subjectsKeys: SubjectKey[] = ['INF', 'MTH', 'RUS'];
export const isSubjectKey = (maybeSubjectKey: unknown): boolean => {
    const foundSubjectKey = subjectsKeys.indexOf(maybeSubjectKey as SubjectKey);
    return foundSubjectKey !== -1;
}

const subjects: Map<SubjectKey, Subject> = new Map([
    [ 'NAN',  { name: '', tasksCount: 0 }, ],
    [ 'INF',  { name: 'Информатика', tasksCount: 27 }, ],
    [ 'MTH',  { name: 'Математика', tasksCount: 18 }, ],
    [ 'RUS',  { name: 'Русский Язык', tasksCount: 27 }, ],
]);
export default Array.from(subjects.values());
export const subject = (subjectName: SubjectKey) => (
    subjects.get(subjectName)!
);