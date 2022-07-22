// Sabitov Kirll, 6/11/2022

import React, { useEffect } from "react";
import { 
    Flex,
    Text,
    Button,
    Box,
    Icon,
    Modal,
    ModalOverlay,
    ModalContent,
    useDisclosure,
    IconButton
} from "@chakra-ui/react";
import { MdOpenInFull } from "react-icons/md";
import { FiMinimize2 } from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";
import { BiPlay, BiStop } from "react-icons/bi";
import { BsDot } from "react-icons/bs";

import { Card } from "../../components/Card";
import { MMSSTimeString } from "../../hooks/useTimer";
import { connect, ConnectedProps } from "react-redux";
import { RootState, subjects } from "../../store";

interface TaskTrackerOwnProps {
    taskNumber: number,
    toggleTaskTracker: (taskNumber: number) => void
}

export const TaskReckerView = (props: TaskTrackerOwnProps & TaskTrackerReduxProps) => {
    const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
    const {
        taskNumber,
        canInteract,
        executionState,
        time,
        toggleTaskTracker,
        subject
    } = props;

    useEffect(() => {
        if (executionState === 'started') onOpen();
        if (executionState === 'ended') onClose();
    }, [executionState])

    const card = (visible: boolean) => (
        <Card
            animate={visible ? 'visible' : 'exit'}
            position='relative' gap={0} pt={1}
            h={170} minW='350px'
        >
            <Text
                color='neutral.100'
                fontSize={13} mr='45%'
                bottom={-2.5} pos='relative'
            >{subject.tasks[taskNumber]}</Text>
            <Flex width='100%' alignItems='center'>
                <Text fontSize={18}>{`Задание №${taskNumber + 1}`}</Text>

                <Flex ml='auto' left={6} gap={2} position='relative'>
                    <Button
                        size='md' aria-label='Действие с заданием'
                        onClick={() => toggleTaskTracker(taskNumber)}
                        disabled={!canInteract || executionState === 'ended'}
                        variant={
                            executionState === 'notStarted' ? 'smooth' :
                            executionState === 'started'    ? 'error' :
                            'success'
                        }
                        leftIcon={
                            executionState === 'notStarted' ? <BiPlay fontSize={25} /> :
                            executionState === 'started'    ? <BiStop fontSize={25} /> :
                            <IoCheckmarkDone fontSize={30} />
                        }
                    > { executionState === 'notStarted' ? 'Начать' :
                        executionState === 'started'    ? 'Закончить' :
                        'Выполнено' }
                    </Button>
                    <IconButton
                        onClick={onToggle} variant='smooth'
                        aria-label='Открыть задание на весь экран'
                        icon={!isOpen ? <MdOpenInFull /> : <FiMinimize2 />}
                    />
                </Flex>
            </Flex>

            <Flex bottom={2.5} alignItems='center' position='absolute'>
                <Icon w={6} h={6} as={BsDot} color={
                    executionState !== 'notStarted' ?
                    executionState !== 'started' ?
                    'success.100' : 'error.100' : 'neutral.200' 
                }/>
                { executionState !== 'notStarted' &&
                <Text color='neutral.200' fontSize={18}
                >Время: {MMSSTimeString(time)}</Text> }
            </Flex>
        </Card>
    );

    return (
        <Box>
        {card(!isOpen)}
        <Modal
            isCentered 
            onClose={onClose}
            isOpen={isOpen}
        >
            <ModalOverlay />
            <ModalContent 
                background='transparent'
                shadow='none'
                maxW={{ base: '95vw', md: 'fit-content' }}
            >
                {card(isOpen)}
            </ModalContent>
        </Modal>
        </Box>
    );
}

const connector = connect(
    (state: RootState, ownProps: TaskTrackerOwnProps) => ({
        canInteract: 
            (state.tasksSession.sessions[state.subject.subjectKey].curentlyExecutingTaskNumber === -1 ||
             state.tasksSession.sessions[state.subject.subjectKey].curentlyExecutingTaskNumber === ownProps.taskNumber) &&
            state.tasksSession.sessions[state.subject.subjectKey].tasksExecutionState != 'ended',
        executionState: 
            state.tasksSession.sessions[state.subject.subjectKey].curentlyExecutingTaskNumber !== ownProps.taskNumber ?
            state.tasksSession.sessions[state.subject.subjectKey].executedTasks[ownProps.taskNumber] != null ?
            'ended' : 'notStarted' : 'started',
        time:
            state.tasksSession.sessions[state.subject.subjectKey].curentlyExecutingTaskNumber !== ownProps.taskNumber ?
            state.tasksSession.sessions[state.subject.subjectKey].executedTasks[ownProps.taskNumber] != null ?
            state.tasksSession.sessions[state.subject.subjectKey].executedTasks[ownProps.taskNumber].duration :
            0 : state.tasksSession.sessions[state.subject.subjectKey].curentlyExecutingTaskRecord.duration,
        canSubmit:
            state.tasksSession.sessions[state.subject.subjectKey].tasksExecutionState == 'ended' &&
            state.tasksSession.sessions[state.subject.subjectKey].executedTasks[ownProps.taskNumber] != null,
        subject: subjects[state.subject.subjectKey],
    })
)

type TaskTrackerReduxProps = ConnectedProps<typeof connector>

export const TaskTracker = connector(TaskReckerView);