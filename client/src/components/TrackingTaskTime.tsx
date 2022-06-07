// Sabitov Kirill, 6/3/2022

import { Button, CloseButton, Divider, Flex, FlexProps, HeadingProps, HStack, Text, useColorModeValue } from "@hope-ui/solid";
import { Component, JSXElement } from "solid-js";

import { TaskData } from "../stores/tasksTrecker";
import { Time } from "../utils/createTimer";

interface CardProps {
    headerProps?: HeadingProps,
    header?: string,
    children?: JSXElement,
    canClose?: boolean,
    onClose?: () => void
}

export const Card: Component<CardProps & FlexProps> = (props) => (
    <Flex
        flexDirection='column' p={10}
        borderRadius={10} gap={5} height='100%'
        {...props}
    >
        <HStack>
            <Text fontSize='$xl'>{props.header}</Text>
            { props.canClose &&  
            <CloseButton ml='auto' onClick={props.onClose} />
            }
        </HStack>
        <Divider />
        {props.children}
    </Flex>
)

interface TaskTimeTrackerProps {
    task: TaskData,
    taskNumber: number,
    canInteract: boolean,
    toggleWorkState: () => void,
}

export const TrackingTaskTime: Component<TaskTimeTrackerProps> = (props) => {
    const mainColor = useColorModeValue('$blackAlpha3', '$neutral2');
    
    return (
        <Card backgroundColor={mainColor()} header={'Задание №' + (props.taskNumber + 1)}>
            <Flex
                flexDirection='row' justifyContent='end'
                width='100%' alignItems='center'
            >
                {
                    props.task.state != 'notStarted' && 
                    <Text fontSize='$lg' m='auto'>{Time.makeString(props.task.record.duration)}</Text> 
                }
                <Button
                    size='sm'
                    disabled={!props.canInteract || props.task.state == 'ended'}
                    onClick={props.toggleWorkState}
                    colorScheme={
                        props.task.state == 'notStarted' ? 'info' :
                        props.task.state == 'started'    ? 'danger' :
                        'success'
                    }
                >{
                    props.task.state == 'notStarted' ? "Начать" :
                    props.task.state == 'started'    ? "Закончить" :
                    'Выполнено'
                }</Button>
            </Flex>
        </Card>
    );
}