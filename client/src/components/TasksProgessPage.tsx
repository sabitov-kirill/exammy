// Sabitov Kirill, 6/4/2022

import { Button, Divider, Flex, Grid, Heading } from "@hope-ui/solid";
import { Component, createMemo, createSignal, For } from "solid-js";

import { subjectStore } from "../stores/store";
import { SubjectSelectAlert, TaskSelectAlert } from "./Alerts";
import { PageHeader } from "./PageHeader";
import { TaskProgressStatistics } from './TaskProgressStatistics'

const TrackingPage: Component = () => {
    const [taskNumber, setTaskNumber] = createSignal(-1);
    const tasksNumbers = createMemo(() => (
        [...Array(subjectStore.subject().tasksCount).keys()]
    ));

    return (
        <Flex
            flexDirection='column'
            margin={{ '@initial': 15, '@md': 'auto' }}
            gap={15} maxW='$containerSm'
            pb={{ '@initial': 70, '@md': 5}}            
        >
            <PageHeader text='Статистика' />
            <Flex
                flexDirection='row' gap={5}
                overflowX='scroll' p={5}
            >
                <For each={tasksNumbers()}>
                {(task) =>
                    <Button
                        variant='subtle'
                        onClick={() => setTaskNumber((currentTask) => (
                            currentTask == task ? -1 : task
                        ))}
                    >{task + 1}</Button>
                }
                </For>
            </Flex>
            <Divider />
            {
                !subjectStore.isSubjectSelected() ? <SubjectSelectAlert /> :
                taskNumber() == -1 ? <TaskSelectAlert /> :
                <TaskProgressStatistics taskNumber={taskNumber} />
            }
        </Flex>
    )
}

export default TrackingPage;