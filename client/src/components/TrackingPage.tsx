// Sabitov Kirill, 6/4/2022

import { Badge, Button, Grid, GridItem, HStack, IconButton, Text } from "@hope-ui/solid";
import { Component, For } from "solid-js";
import { RiDeviceRestartLine } from 'solid-icons/ri';
import { BiSolidCheckCircle } from 'solid-icons/bi';
import { AiFillInfoCircle } from 'solid-icons/ai';

import { subjectStore, tasksTreckerStore } from "../stores/store";
import { createWindowSize } from "../utils/createWindowSize";
import { SubjectSelectAlert } from "./Alerts";
import { PageHeader } from "./PageHeader";
import { TrackingTaskTime, Card } from "./TrackingTaskTime";
import { createBoolean } from "../utils/createBoolean";
import { RestartConfirmationModal } from "./Feedback";

const InfoPanel: Component<{ onClose: () => void }> = (props) => {
    return (
        <Card
            canClose onClose={props.onClose}
            backgroundColor={'$blackAlpha7'}
            header='Информация' borderRadius='$sm'
        >
            <Text lineHeight='1.1' color='$neutral11'>
                На этой странице вы можете засекать время выполнения заданий по вредмету
                <Badge colorScheme='accent'>{subjectStore.subject().name}</Badge>.
                Решайте вариант ЕГЭ и отмечайте, когда начинаете и заканчиваете делать каждое задание.
                После окончания вам будет предложено отметить какие задания были решены верно, а какие нет.
                Затем данные будут записаны в вашу статистику и вы сможете отследить прогресс.
            </Text>
            <Text 
                fontSize='$lg' textAlign='center'
                my='auto' color='$primary10'
            >Удачной подготовки!</Text>
        </Card>
    )
}

const ActionsPanel: Component<{ restart: () => void, submit: () => void, info: () => void }> = (props) => (
    <Card
        backgroundColor={'$blackAlpha7'}
        header='Действия'  borderRadius='$sm'
    >
        <Grid
            templateColumns='auto 1fr 1fr'
            mt='auto' gap={{ '@initial': 5, '@md': 10 }}
        >
            <IconButton
                icon={<AiFillInfoCircle size={22} />}
                aria-label='Панель информации'
                onClick={props.info}
            />
            <RestartConfirmationModal restart={props.restart} />
            <Button
                colorScheme='success' onClick={props.submit}
                leftIcon={<BiSolidCheckCircle size={22} />}
            >Завершить</Button>
        </Grid>
    </Card>
)

const TrackingPage: Component = () => {
    const [showInfow, toggleShowInfo] = createBoolean(true);
    const windowSize = createWindowSize();    
    const {
        isSubmited,
        currentTask,
        tasksData,
        taskAction,
        restart,
        submit
    } = tasksTreckerStore;

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
                <PageHeader text='Выполнение заданий' />
            </GridItem>

            { showInfow() &&
            <GridItem rowSpan={2}>
                <InfoPanel onClose={toggleShowInfo} />
            </GridItem>
            }
            
            <ActionsPanel 
                restart={restart}
                submit={submit}
                info={toggleShowInfo} 
            />

            { subjectStore.isSubjectSelected() ?
            <For each={tasksData}>
                { (task, index) =>
                    <GridItem>
                    <TrackingTaskTime
                        canInteract={!isSubmited() && (currentTask() == index() || currentTask() == -1)}
                        taskNumber={index()}
                        task={task}
                        toggleWorkState={() => taskAction(index())}
                    />
                    </GridItem>
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