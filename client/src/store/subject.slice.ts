// Sabitov Kirill, 6/10/2022 

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/** Keys to be mapped to subjects objects */
export enum SubjectKey {
    NAN,
    INF,
    MTH,
    RUS,
}

/** Subject store slice state type. */
export interface SubjectState {
    isSubjectSelected: boolean,
    subjectKey: SubjectKey
}

const initialState: SubjectState = {
    isSubjectSelected: false,
    subjectKey: SubjectKey.NAN
}

/** Subject store slice creation function. */
const subjectSlice = createSlice({
    name: 'subject',
    initialState,
    reducers: {
        changeSubject (state, action: PayloadAction<SubjectKey>) {    
            state.isSubjectSelected = true;
            state.subjectKey = action.payload;
        },
    }
});
export const { changeSubject } = subjectSlice.actions;
export default subjectSlice.reducer;

/** Subject object data type. */
export interface Subject {
    key: SubjectKey,
    name: string,
    duration: number,
    tasks: Array<string>,
    description?: string,
    dateOfExam?: number,
    icon?: JSX.Element,
}

/** All existing subjects array. */
export const subjects: Readonly<Array<Subject>> = [
    { key: SubjectKey.NAN, name: '',             duration: 0,     tasks: [] },
    { key: SubjectKey.INF, name: 'Информатика',  duration: 14100, tasks: ['Анализ информационных моделей','Построение таблиц истинности логических выражений','Поиск информации в реляционных базах данных','Кодирование и декодирование информации','Анализ и построение алгоритмов для исполнителей','Анализ программ','Кодирование и декодирование информации. Передача информации','Перебор слов и системы счисления','Работа с таблицами','Поиск символов в текстовом редакторе','Вычисление количества информации','Выполнение алгоритмов для исполнителей','Поиск путей в графе','Кодирование чисел. Системы счисления','Преобразование логических выражений','Рекурсивные алгоритмы','Обработки числовой последовательности','Робот-сборщик монет','Выигрышная стратегия. Задание 1','Выигрышная стратегия. Задание 2','Выигрышная стратегия. Задание 3','Анализ программы с циклами и условными операторами','Оператор присваивания и ветвления. Перебор вариантов, построение дерева','Обработка символьных строк','Обработка целочисленной информации','Обработка целочисленной информации','Программирование',] },
    { key: SubjectKey.MTH, name: 'Математика',   duration: 0,     tasks: [] },
    { key: SubjectKey.RUS, name: 'Русский Язык', duration: 0,     tasks: [] },
];