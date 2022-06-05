// Sabitov Kirill, 6/4/2022

import { Grid, GridItem, Heading } from "@hope-ui/solid";
import { Component, For } from "solid-js";

import progressStore from "../stores/progressStore";
import progressTracker from "../stores/progressTracker"
import { useWindowSize } from "../stores/useWindowSize";
import { SubjectSelectAlert } from "./Alerts";
import { TrackingTaskTime } from "./TrackingTaskTime";

const TrackingPage: Component = () => {
    const windowSize = useWindowSize();    
    const {
        taskInWorkNumber,
        setTaskInWorkNumber,
        tasksNumbers,
        timers
    } = progressTracker;

    return (
        <Grid
            margin={{ '@initial': 15, '@lg': 'auto' }}
            gap={{ '@initial': 5, '@md': 10 }}
            pb={{ '@initial': 70, '@md': 5}}
            maxW={{
                '@initial': '$containerXl',
                '@md': '$containerLg', '@2xl': '$containerXl' 
            }}
            templateColumns={`repeat(${
                windowSize() > 1536 ? 3 :
                windowSize() > 768 ? 2 : 1}, 1fr)
            `}
        >
            <GridItem colSpan={{ '@initial': 1, '@md': 2, '@2xl': 3 }}>
                <Heading
                    margin='auto' textAlign='center' color='$primary9'
                    textTransform='uppercase' letterSpacing={5} fontSize='$3xl'
                >Трекер результатов выполнения</Heading>
            </GridItem>
            { 
                progressStore.isSubjectSelected() ?
                <For each={tasksNumbers()}>
                    {(task, index) =>
                        <TrackingTaskTime
                            canInteract={taskInWorkNumber() == -1 || taskInWorkNumber() == task}
                            taskNumber={task} timer={timers[index()]}
                            toggleWorkState={() => setTaskInWorkNumber(currentTaskInWorkNumber => (
                                currentTaskInWorkNumber == -1 ? task : -1
                            ))}
                        />
                    }
                </For> :
                <GridItem colSpan={{ '@initial': 1, '@md': 2, '@2xl': 3 }}>
                    <SubjectSelectAlert />
                </GridItem>
            }            
        </Grid>
    );
}

export default TrackingPage;