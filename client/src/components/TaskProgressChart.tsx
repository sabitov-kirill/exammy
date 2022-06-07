// Sabitov Kirill, 6/4/2022

import interpolate from 'color-interpolate';
import { Chart, registerables } from 'chart.js';
import { Component, createEffect, createMemo, onMount } from "solid-js";

import { tasksRecordsStore } from '../stores/store';

Chart.register(...registerables);

export const TaskProgressChart: Component<{ taskNumber: number }> = (props) => {
    const createLabels = () => tasksRecordsStore.tasksRecords[props.taskNumber].records?.map((record) => {
        return record.startDate.toString().slice(0, 10);
    }) ?? [];

    const createData = () => tasksRecordsStore.tasksRecords[props.taskNumber].records?.map((record) => 
        record.duration.raw
    ) ?? [];

    const colormap = createMemo(() => interpolate(['red', 'green']));
    const createColors = () => {
        const min = tasksRecordsStore.tasksRecords[props.taskNumber].minDuration;
        const max = tasksRecordsStore.tasksRecords[props.taskNumber].maxDuration;        
        return tasksRecordsStore.tasksRecords[props.taskNumber].records?.map((record) => (
            colormap()(1 - (max == min ? 0 : (record.duration.raw - min) / (max - min)))
        )) ?? [];
    }

    let canvasRef: HTMLCanvasElement | undefined;
    let chart: Chart<"bar", number[], string>;
    onMount(() => {
        chart = new Chart(canvasRef!.getContext('2d')!, {
            type: 'bar',
            options: {
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            title: (records) => records.map((record, index) => 'Задание выполнено ' + records[index].label),
                            beforeLabel: () => 'Время выполнения:',
                            label: (record) => record.parsed.y + ' сек.',
                        }
                    }
                }
            },
            data: {
                labels: createLabels(),
                datasets: [{
                    data: createData(),
                    backgroundColor: createColors(),
                }]
            }
        })
    })

    createEffect(() => {
        chart.data.labels = createLabels();
        chart.data.datasets[0].data = createData();
        chart.data.datasets[0].backgroundColor = createColors();
        chart.update();
    })

    return (
        <canvas ref={canvasRef!} width={5} height={2}/>
    );
}