// Sabitov Kirill, 6/11/2022

import React from "react";
import { MdRestartAlt } from "react-icons/md";
import { 
    Text,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ButtonProps,
    IconButton,
    Tooltip
} from "@chakra-ui/react";
import { Card } from "../../components/Card";

export interface RestartConfirmationModalProps {
    restart: () => void,
    showText?: boolean,
    trigerProps?: ButtonProps
}

export const RestartConfirmationModal = (props: RestartConfirmationModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onRestart = () => {
        props.restart();
        onClose();
    }

    return (
        <>
            <Tooltip label='Перезапустить'>
            <IconButton
                aria-label='Перезапустить тест'
                onClick={onOpen} variant='error'
                icon={<MdRestartAlt size={25} />}
                width='full' {...props.trigerProps}
            /></Tooltip>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent background='transparent' shadow='none'>
                <Card p={0}>
                    <ModalHeader>Предупреждение</ModalHeader>
                    <ModalCloseButton m={2} />
                    <ModalBody>
                        <Text lineHeight='1.1' color='neutral11'>
                            Вы уверены что хотите перезапустить решение варианта?
                            Время выполнения всех заданий будет сброшено и данные
                            не будут записаны в вашу статистику.
                        </Text>
                    </ModalBody>
                    <ModalFooter gap={5}>
                        <Button variant='rounded' onClick={onClose}>Отмена</Button>
                        <Button variant='error' onClick={onRestart}>Перезапустить</Button>
                    </ModalFooter>
                </Card>
                </ModalContent>
            </Modal>
        </>
    )
}