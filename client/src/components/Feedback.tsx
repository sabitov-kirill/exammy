// Sabitov Kirill, 6/7/2022

import { notificationService, Modal, ModalProps, Button, createDisclosure, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, Text } from "@hope-ui/solid";
import { RiDeviceRestartLine } from "solid-icons/ri";
import { Component } from "solid-js";

import { subjectStore } from "../stores/store";

export const showChooseSubjectNotify = () => {
    !subjectStore.isSubjectSelected() &&
    notificationService.show({
        id: "selectSubjectNotify",
        status: "danger",
        title: "Ошибка",
        description: "Пожалуйста, выберите предмет, что бы перейти на эту страницу! 🤥",
    });
}

export const closeChooseSubjectNotify = () => {
    notificationService.hide("selectSubjectNotify")
}

export const succesSubmitRecordsNotify = () => {
    notificationService.show({
        id: "succesSubmitRecordsNotify",
        status: "success",
        title: "Отлично!",
        description: "Трек заданий успешно сохранен в вашу статистику. 😊",
    });
}

export const zeroRecordsOnSubmittionNotify = () => {
    notificationService.show({
        id: "zeroRecordsOnSubmittionNotify",
        status: "warning",
        title: "Постой...",
        description: "Ты не сделал ни одного задания. 😑",
    });
}

export const RestartConfirmationModal: Component<{ restart: () => void }> = (props) => {
    const { isOpen, onOpen, onClose } = createDisclosure();
    const onRestart = () => {
        props.restart();
        onClose();
    }

    return (
        <>
            <Button
                colorScheme='danger' onClick={onOpen}
                leftIcon={<RiDeviceRestartLine size={22} />}
            >Перезапустить</Button>
            <Modal opened={isOpen()} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalCloseButton />
                <ModalHeader>Предупреждение</ModalHeader>
                <ModalBody>
                    <Text lineHeight='1.1' color='$neutral11'>
                        Вы уверены что хотите перезапустить решение варианта?
                        Время выполнения всех заданий будет сброшено и данные не будут записаны
                        в вашу статистику.
                    </Text>
                </ModalBody>
                <ModalFooter gap={5}>
                    <Button colorScheme='neutral' onClick={onClose}>Отмена</Button>
                    <Button colorScheme='danger' onClick={onRestart}>Перезапустить</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}