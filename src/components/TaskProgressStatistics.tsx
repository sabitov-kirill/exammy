// Sabitov Kirill, 6/5/2022

import { Flex, Text } from "@hope-ui/solid";
import { Component } from "solid-js";

import progressStore from "../stores/progressStore";
import { TaskProgressChart } from "./TaskProgressChart";

export const TaskProgressStatistics:
    Component<{ taskNumber: () => number}>= (props) => {
    if (props.taskNumber() == -1)
        return;

    return (
        <Flex flexDirection='column'>
            <Text fontSize='$xl' textAlign='center'>Задание №{props.taskNumber() + 1}</Text>
            <TaskProgressChart taskNumber={props.taskNumber()} />
            <Text>Задание выполнено {progressStore.tasksRecords[props.taskNumber()].records.length} раз(а)</Text>
            <Text>Лучшее время выполнения: {
                progressStore.tasksRecords[props.taskNumber()].minDuration == Number.MAX_SAFE_INTEGER ?
                0 : progressStore.tasksRecords[props.taskNumber()].minDuration
            } секунд</Text>
            <Text>Худшее время выполнения: {progressStore.tasksRecords[props.taskNumber()].maxDuration} секунд</Text>
            <Text>Среднее время выполнения: {
                progressStore.tasksRecords[props.taskNumber()].avgDuration.toFixed(2)
            } секунд</Text>
            <Text>Суммарное время выполнения: {progressStore.tasksRecords[props.taskNumber()].sumDuration} секунд</Text>
        </Flex>
    );
}