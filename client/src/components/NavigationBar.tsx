// Sabitov Kirill, 6/3/2022

import React from "react";
import {
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { BiTask } from "react-icons/bi";
import { ImStatsDots } from "react-icons/im";
import { AiOutlineMenu } from "react-icons/ai";

import { NavigationButton, NavigationButtonToMain } from "./NavigationButton";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { UserMenu } from "./UserMenu";
import { SubjectSelectList } from "./SubjectSelect";

const Menu = () => {
    const background = useColorModeValue('backgroundLight.back', 'backgroundDark.back');
    const color = useColorModeValue('neutral.100', 'white');
    const { onOpen, onClose, isOpen } = useDisclosure(); 
    return (<>
        <IconButton
            onClick={onOpen}
            size="lg" fontSize="lg"
            icon={<AiOutlineMenu />}
            color={color}
            variant={'ghost'}
            aria-label={`Открыть меню`}
        />
        <Drawer
            isOpen={isOpen}
            onClose={onClose}
            placement='right'
        >
            <DrawerOverlay />
            <DrawerContent background={background}>
                <Flex gap={5} flexDirection='column' h='full'>
                    <Flex
                        flexDirection='column'
                        p={5} gap={5} shadow='md'
                        background='primary.100'
                        borderBottomRadius='3xl'
                        color='white'
                    >
                        <Box mx='auto'><NavigationButtonToMain /></Box>
                        <UserMenu />
                    </Flex>

                    <SubjectSelectList />

                    <Flex mt='auto' alignItems='center' px={5} py={2}>
                        <Text fontSize={20} color={color}>Цветовая тема</Text>
                        <ColorModeSwitcher ml='auto'/>
                    </Flex>
                </Flex>
            </DrawerContent>
        </Drawer>
    </>);
}

export const NavigationBar = () => {
    const background = useColorModeValue('backgroundLight.back', 'backgroundDark.back');
    const color = useColorModeValue('neutral.100', 'white');
    return (
        <HStack
            zIndex='docked' background={background}
            p={1.5} m={0} width='100vw'
            position='fixed' bottom={0}
            justifyContent='space-around'
            shadow='dark-lg'
        >
            <NavigationButton color={color} to='/statistics' icon={<ImStatsDots />} text="статистика" />
            <NavigationButton color={color} to='/tasks-session'icon={<BiTask />} text="выполнение заданий" />
            <Menu />
        </HStack>
    );
}