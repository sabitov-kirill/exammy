// Sabitov Kirill, 6/10/2022

import { configureStore } from "@reduxjs/toolkit";
import { loadState, saveState } from "./localStorage";
import subjectSlice from "./subject.slice";
import tasksSessionSlice from "./tasksSession.slice";

const preloadedState = loadState();
export const store = configureStore({
    preloadedState,
    reducer: {
        subject: subjectSlice,
        tasksSession: tasksSessionSlice,
    },
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export * from "./subject.slice";
export * from "./tasksSession.slice";
export * from "./tasksStatistics.slice";