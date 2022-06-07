import { notificationService } from "@hope-ui/solid";
import { createRoot, onCleanup } from "solid-js";

import createSubject from "./subject";
import createTasksRecords from "./tasksRecords";
import createTasksTracker from "./tasksTrecker";

export * from "./subject";
export * from "./tasksRecords";
export * from "./tasksTrecker";

export const subjectStore = createRoot(createSubject);
export const tasksRecordsStore = createRoot(createTasksRecords);
export const tasksTreckerStore = createRoot(createTasksTracker);

subjectStore.chooseStoredSubject();