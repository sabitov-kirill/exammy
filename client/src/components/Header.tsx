// Sabitov Kirill, 6/3/2022

import React from "react";
import { ImStatsDots } from "react-icons/im";
import { BiTask } from "react-icons/bi";
import { Flex } from "@chakra-ui/react";

import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SubjectSelectMenu } from "./SubjectSelect";
import { NavigationButton, NavigationButtonToMain } from "./NavigationButton";
import { UserMenu } from "./UserMenu";

export const Header = () => (
    <Flex
        flexDirection='row' alignItems='center' shadow='md'
        p={3} m={3} gap={3} borderRadius='md'
        background='primary.100' color='white'
    >
        <NavigationButtonToMain />
        <NavigationButton icon={<ImStatsDots />} text='Статистика' to='/statistics' />
        <NavigationButton icon={<BiTask />} text='Выполнение заданий' to='/tasks-session' />
        <ColorModeSwitcher ml='auto'/>
        <SubjectSelectMenu />
        <UserMenu />
    </Flex>
)