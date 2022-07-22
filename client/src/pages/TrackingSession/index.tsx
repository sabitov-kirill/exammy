// Sabitov Kirill, 6/11/2022

import React, { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { ConnectedProps, connect } from "react-redux";
import { 
    Grid,
    GridItem,
    Heading,
    useBoolean,
} from "@chakra-ui/react";

import Layout from "../../components/Layout";
import { PageHeading } from "../../components/PageHeading";
import { InfoPanel } from "./InfoPanel";
import { ActionsPanel } from "./ActionsPanel";
import { AnimatePresence } from "framer-motion";
import { TaskTracker } from "./TaskTrecker";
import {
    endTaskExecution,
    increaseCurrentTaskDuration,
    restartSession,
    RootState,
    startTaskExecution,
    subjects,
    submitSession
} from "../../store";
import { Navigate } from "react-router-dom";

let timerHandle: NodeJS.Timer | undefined;
const TrackingPageView = (props: TrackingPageProps) => {    
    const [showInfow, setShowInfo] = useBoolean(true);
    
    const toggleTaskTracker = (taskNumber: number) => {
        if (props.curentlyExecutingTask === -1) {
            props.startTaskExecution(taskNumber);
        } else if (props.curentlyExecutingTask === taskNumber) {
            props.endTaskExecution(taskNumber);
        }
    }

    const tasksTrackers = useMemo(() => Array.from(Array(props.tasksCount).keys()).map((_, i) => (
        <TaskTracker
            key={`task${i}TrackerKey`}
            toggleTaskTracker={toggleTaskTracker}
            taskNumber={i}
        />
    )), [props.tasksCount, props.curentlyExecutingTask]);
            
    useEffect(() => {
        if (timerHandle != undefined) {
            clearInterval(timerHandle);
            timerHandle = undefined;
        }        
        if (props.curentlyExecutingTask !== -1) {
            timerHandle = setInterval(() => props.increaseCurrentTaskDuration(), 1000);
        }
    }, [props.curentlyExecutingTask]);
    
    if (!props.isSubjectSelected) return <Navigate to='/' />
    
    return (
        <Layout title='Решение Заданий'>
            <Grid
                margin={{ base: 15, xl: 'auto' }}
                gap={{ base: 2, md: 5 }}
                pb={{ base: 100, md: 5}}
                maxW={{ xl: 'container.xl' }}
                templateColumns='repeat(auto-fit, minmax(350px, 1fr))'
                autoRows='minmax(min-content, max-content)'
            >
                <GridItem gridColumn={'1/-1'}>
                    <PageHeading text='Выполнение заданий' />
                </GridItem>

                <AnimatePresence initial={false}>
                {showInfow &&
                <GridItem rowSpan={2}>
                    <InfoPanel 
                        key='tasksSessionInfoPanel'
                        onClose={setShowInfo.toggle} 
                    />
                </GridItem> }

                <ActionsPanel
                    key='tasksSessionActionsPanel' 
                    submit={props.submitSession}
                    info={setShowInfo.toggle} 
                    restart={() => {
                        props.restartSession();
                        clearInterval(timerHandle);
                    }}
                />
                
                {tasksTrackers}
                </AnimatePresence>                   
            </Grid>
        </Layout>
    );
}

const connector = connect(
    (state: RootState) => ({
        subject: state.tasksSession.currentSessionSubjectKey,
        isSubjectSelected: state.subject.isSubjectSelected,
        tasksCount: subjects[state.tasksSession.currentSessionSubjectKey].tasks.length,
        curentlyExecutingTask: state.tasksSession.sessions[state.tasksSession.currentSessionSubjectKey].curentlyExecutingTaskNumber,
        tasksExecutionState: state.tasksSession.sessions[state.subject.subjectKey].tasksExecutionState,
    }),
    (dispatch) => ({
        startTaskExecution: (taskNumber: number) => dispatch(startTaskExecution(taskNumber)),
        endTaskExecution: (taskNumber: number) => dispatch(endTaskExecution(taskNumber)),
        increaseCurrentTaskDuration: () => dispatch(increaseCurrentTaskDuration()),
        submitSession: () => dispatch(submitSession()),
        restartSession: () => dispatch(restartSession()),
    })
)

type TrackingPageProps = ConnectedProps<typeof connector>

export default connector(TrackingPageView);