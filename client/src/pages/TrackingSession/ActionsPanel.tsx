// Sabitov Kirill, 6/11/2022

import React, { useMemo } from "react";
import { AiFillInfoCircle, AiFillCheckCircle } from "react-icons/ai";
import { 
    Grid,
    IconButton,
    useBreakpoint,
    Text,
    Progress,
    Flex,
    Tooltip,
    Box,
} from "@chakra-ui/react";

import { Card } from "../../components/Card";
import { RestartConfirmationModal } from "./RestartConfirmationModal";
import { connect, ConnectedProps } from "react-redux";
import { RootState, subjects } from "../../store";
import { HHMMSSTimeString } from "../../hooks/useTimer";

interface ActionsPanelProps extends ActionsPanelReduxProps {
    restart: () => void,
    submit: () => void,
    info: () => void
}

export const ActionsPanelView = (props: ActionsPanelProps) => {
    const sessionTimePercent = useMemo(() =>
        Math.floor(100 * props.sessionDuration / props.subjectDuraion),
        [props.sessionDuration, props.subjectDuraion]
    );
    const isSmall = useBreakpoint() === 'base';

    return (
        <Card gap={2.5}>
            <Text fontSize={25}>Вариант ЕГЭ - Управление</Text>
            <Progress value={sessionTimePercent} size='xs' borderRadius='md' mt={5}/>
            <Flex top={-2} position='relative'>
                <Text fontSize={18}>
                    {HHMMSSTimeString(props.sessionDuration)}/{HHMMSSTimeString(props.subjectDuraion)}
                </Text>
                <Text color='neutral.200' fontSize={14} ml='auto'
                >{sessionTimePercent}%</Text>
            </Flex>
            <Grid
                templateColumns='1fr 1fr 1fr'
                mt='auto' gap={2}
            >
                <Tooltip label='Информация'>
                <IconButton
                    icon={<AiFillInfoCircle size={25} />}
                    aria-label='Панель информации'
                    onClick={props.info} variant='smooth'
                />
                </Tooltip>

                <RestartConfirmationModal
                    restart={props.restart} showText={!isSmall}
                    trigerProps={{ variant: `errorOutlined`}}
                />

                <Tooltip label='Завершить'>
                <IconButton
                    onClick={props.submit} variant={`successOutlined`}
                    icon={<AiFillCheckCircle size={25} />}
                    aria-label='Завершить Вариант'
                />
                </Tooltip>
            </Grid>
        </Card>
    );
}

const connector = connect(
    (state: RootState) => ({
        sessionDuration: state.tasksSession.sessions[state.subject.subjectKey].duraion,
        subjectDuraion: subjects[state.subject.subjectKey].duration
    }),
)
type ActionsPanelReduxProps = ConnectedProps<typeof connector>

export const ActionsPanel = connector(ActionsPanelView);