// Sabitov Kirill, 6/11/2022

import React from "react";
import { useSelector } from "react-redux";
import { 
    Text,
    Badge,
    useColorModeValue,
} from "@chakra-ui/react";

import { Card } from "../../components/Card";
import { subjects, RootState } from "../../store";
import { slideVariant } from "../../theme";

export const InfoPanel = (props: { onClose: () => void }) => {
    const subject = useSelector((state: RootState) => (
        subjects[state.subject.subjectKey].name
    ));
    const color = useColorModeValue('black', 'neutral');

    return (
        <Card
            variants={slideVariant} exit='exit'
            initial='initial' animate='visible'
            backgroundColor='transparent'
            shadow='none'
        >
            <Text lineHeight='1.1' color={color}>
                На этой странице вы можете засекать время выполнения заданий по предмету
                <Badge colorScheme='accent'>{subject}</Badge>.
                Решайте вариант ЕГЭ и отмечайте, когда начинаете и заканчиваете делать каждое задание.
                После завершения решения заданий нажмите на зеленую кнопку и данные будут записаны в вашу статистику и вы сможете отследить прогресс.
            </Text>
            <Text 
                fontSize={27} textAlign='center'
                my='auto' color='accent.100'
            >Удачной подготовки!</Text>
        </Card>
    )
}