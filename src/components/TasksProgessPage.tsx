// Sabitov Kirill, 6/4/2022

import { Button, Divider, Flex, Grid, Heading } from "@hope-ui/solid";
import { Component, createMemo, createSignal, For } from "solid-js";

import progressStore from "../stores/progressStore";
import { subject } from "../stores/subjects";
import { useWindowSize } from "../stores/useWindowSize";
import { SubjectSelectAlert, TaskSelectAlert } from "./Alerts";
import { TaskProgressStatistics } from './TaskProgressStatistics'

const TrackingPage: Component = () => {
    const windowSize = useWindowSize();
    const [taskNumber, setTaskNumber] = createSignal(-1);
    const tasksNumbers = createMemo(() => (
        [...Array(subject(progressStore.subjectKey()).tasksCount).keys()]
    ));

    return (
        <Flex
            flexDirection='column'
            margin={{ '@initial': 15, '@md': 'auto' }}
            gap={15} maxW='$containerSm'
            pb={{ '@initial': 70, '@md': 5}}            
        >
            <Heading
                margin='auto' textAlign='center' color='$primary9'
                textTransform='uppercase' letterSpacing={5} fontSize='$3xl'
            >Статистика выполнения заданий</Heading>
            <Grid templateColumns={`repeat(${
                windowSize() > 450 ? 8 : 5
            }, 1fr)`} gap={5}>
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
            </Grid>
            <Divider />
            {
                !progressStore.isSubjectSelected() ? <SubjectSelectAlert /> :
                taskNumber() == -1 ? <TaskSelectAlert /> :
                <TaskProgressStatistics taskNumber={taskNumber} />
            }
        </Flex>
    )
}

export default TrackingPage;