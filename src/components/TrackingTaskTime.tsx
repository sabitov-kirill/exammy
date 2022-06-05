// Sabitov Kirill, 6/3/2022

import { Button, Divider, Flex, Text, useColorModeValue } from "@hope-ui/solid";
import { Component } from "solid-js";
import { Time } from "../stores/time";

import { Timer } from "../stores/useTimer"

interface TaskTimeTrackerProps {
    taskNumber: number,
    canInteract: boolean,
    toggleWorkState: () => void,
    timer: Timer
}

export const TrackingTaskTime: Component<TaskTimeTrackerProps> = (props) => {
    const mainColor = useColorModeValue('$blackAlpha3', '$neutral2');
    return (
        <Flex
            flexDirection='column'
            backgroundColor={mainColor()}
            p={10} borderRadius={10}
            gap={5}
        >
            <Text fontSize='$xl'>Задание №{props.taskNumber + 1}</Text>
            <Divider />
            <Flex
                flexDirection='row' justifyContent='end'
                width='100%' alignItems='center'
            >
                { 
                    props.timer.timerState() != 'notStarted' && 
                    <Text fontSize='$lg' m='auto'>{Time.makeString(props.timer.time)}</Text> 
                }
                <Button
                    size='sm'
                    disabled={!props.canInteract || props.timer.timerState() == 'ended'}
                    onClick={() => {
                        props.timer.toggleTimerState();
                        props.toggleWorkState();
                    }}
                    colorScheme={
                        props.timer.timerState() == 'notStarted' ? 'info' :
                        props.timer.timerState() == 'started' ? 'danger' :
                        'success'
                    }
                >{
                    props.timer.timerState() == 'notStarted' ? "Начать" :
                    props.timer.timerState() == 'started'    ? "Закончить" :
                    'Выполнено'
                }</Button>
            </Flex>
        </Flex>
    );
}