// Sabitov Kirill, 6/5/2022

import { Badge, Flex, Grid, Tag, Text, useColorModeValue } from "@hope-ui/solid";
import { Component } from "solid-js";

import { tasksRecordsStore } from "../stores/store";
import { TaskProgressChart } from "./TaskProgressChart";

export const TaskProgressStatistics:
    Component<{ taskNumber: () => number}>= (props) => {
    const mainColor = useColorModeValue('$blackAlpha5', '$neutral3');
    if (props.taskNumber() == -1)
        return;

    return (
        <Flex flexDirection='column' >
            <Text fontSize='$xl' textAlign='center'>Задание №{props.taskNumber() + 1}</Text>
            <TaskProgressChart taskNumber={props.taskNumber()} />

            <Grid
                templateColumns='70% 30%'
                background={mainColor()} 
                p={10} borderRadius='$lg'
                gap={5} fontSize='$lg'
            >
                <Text color='$neutral11'>Задание выполнено</Text>
                <Tag alignSelf='center'>
                    {tasksRecordsStore.tasksRecords[props.taskNumber()].records.length} раз(а)
                </Tag>
                <Text color='$neutral11'>Лучшее время выполнения:</Text>
                <Tag alignSelf='center' colorScheme='success' textAlign='center' verticalAlign='middle' lineHeight='100%'>
                    {
                        tasksRecordsStore.tasksRecords[props.taskNumber()].minDuration === Number.MAX_SAFE_INTEGER ?
                        0 : tasksRecordsStore.tasksRecords[props.taskNumber()].minDuration
                    } секунд
                </Tag>
                <Text color='$neutral11'>Худшее время выполнения:</Text>
                <Tag alignSelf='center' colorScheme='danger'>
                    {tasksRecordsStore.tasksRecords[props.taskNumber()].maxDuration} секунд
                </Tag>
                <Text color='$neutral11'>Среднее время выполнения:</Text>
                <Tag alignSelf='center'>
                    {tasksRecordsStore.tasksRecords[props.taskNumber()].avgDuration.toFixed(2)} секунд
                </Tag>
                <Text color='$neutral11'>Суммарное время выполнения:</Text>
                <Tag alignSelf='center'>
                    {tasksRecordsStore.tasksRecords[props.taskNumber()].sumDuration} секунд
                </Tag>
            </Grid>                
        </Flex>
    );
}