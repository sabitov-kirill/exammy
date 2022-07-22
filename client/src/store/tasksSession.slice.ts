// sabitov Kirill, 6/10/2022

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ActivityState } from "../hooks/useTimer";
import { SubjectKey, changeSubject, subjects } from "./subject.slice";
import { TaskRecord } from "./tasksStatistics.slice";

/** Task tracking session attached to subject.  */
export interface TasksTrackingSession {
    subjectKey: SubjectKey,
    executedTasks: Array<TaskRecord>,
    tasksExecutionState: ActivityState,
    curentlyExecutingTaskNumber: number,
    curentlyExecutingTaskRecord: TaskRecord,
    duraion: number,
}

/** Tasks tracking store slice state type. */
export interface TasksTrackingState {
    currentSessionSubjectKey: SubjectKey,
    sessions: Array<TasksTrackingSession>,
}

/** Initial tracking session store slice state. */
const initialTrackingSessionState: TasksTrackingState = {
    currentSessionSubjectKey: SubjectKey.NAN,
    sessions: subjects.map((subject) => ({
        subjectKey: subject.key,
        executedTasks: new Array<TaskRecord>(subject.tasks.length),
        tasksExecutionState: 'notStarted',
        curentlyExecutingTaskNumber: -1,
        curentlyExecutingTaskRecord: { startDate: '', duration: 0 },
        duraion: 0,
    }))
}

/**
 * Create EGE variant tasks trecker store slice.
 * Directly depends on the currently selected subject and reloads on subject change.
 */
export const trackingSessionSlice = createSlice({
    name: 'trackingSession',
    initialState: initialTrackingSessionState,
    reducers: {
        /**
         * Start execution of single task.
         * Translates session to work ('started') state.
         */
        startTaskExecution(state, action: PayloadAction<number>) {
            if (state.sessions[state.currentSessionSubjectKey].tasksExecutionState !== 'notStarted') return;

            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskNumber = action.payload;
            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord.duration = 0;
            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord.startDate =
                new Date().toISOString().slice(0, 10);
            state.sessions[state.currentSessionSubjectKey].tasksExecutionState = 'started';
        },

        /**
         * End execution of single task.
         * Translates session to idle ('notStarted') state.
         */
        endTaskExecution(state, action: PayloadAction<number>) {
            if (state.sessions[state.currentSessionSubjectKey].tasksExecutionState !== 'started') return;
            
            state.sessions[state.currentSessionSubjectKey].executedTasks[action.payload] =
                state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord;

            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskNumber = -1;
            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord = { startDate: '', duration: 0 };
            state.sessions[state.currentSessionSubjectKey].tasksExecutionState = 'notStarted';
        },

        /**
         * Increase time of currentl executing task. 
         */
        increaseCurrentTaskDuration(state) {
            if (state.sessions[state.currentSessionSubjectKey].tasksExecutionState !== 'started') return;

            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord.duration += 1;
            state.sessions[state.currentSessionSubjectKey].duraion += 1;
        },

        /**
         * Translates session to submition ('ended') state.
         * During it new tasks can not be executed, only correctivity of
         * existing ones could be checked.
         */
        submitSession(state) {
            if (state.sessions[state.currentSessionSubjectKey] === undefined) return;

            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskNumber = -1;
            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord = { startDate: '', duration: 0 };
            state.sessions[state.currentSessionSubjectKey].tasksExecutionState = 'ended';
        },

        /**
         * Reset session data. 
         */
        restartSession(state) {
            if (state.sessions[state.currentSessionSubjectKey] === undefined) return;

            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskNumber = -1;
            state.sessions[state.currentSessionSubjectKey].curentlyExecutingTaskRecord = { startDate: '', duration: 0 };
            state.sessions[state.currentSessionSubjectKey].tasksExecutionState = 'notStarted';
            state.sessions[state.currentSessionSubjectKey].executedTasks = [];
            state.sessions[state.currentSessionSubjectKey].duraion = 0;
        },
    },
    extraReducers: (builder) =>
        builder.addCase(changeSubject, (state, action) => {
            state.currentSessionSubjectKey = action.payload;
        })
})

export const {
    startTaskExecution,
    endTaskExecution,
    increaseCurrentTaskDuration,
    submitSession,
    restartSession,
} = trackingSessionSlice.actions;
export default trackingSessionSlice.reducer;