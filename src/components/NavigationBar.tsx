// Sabitov Kirill, 6/3/2022

import { IconButton, useColorModeValue, Flex } from "@hope-ui/solid"
import { Link } from "solid-app-router"
import { BiTask } from "solid-icons/bi"
import { FiMenu } from "solid-icons/fi"
import { ImStatsDots } from "solid-icons/im"
import { Component, JSXElement } from "solid-js"

import progressStore from "../stores/progressStore"
import { SubjectSelectPopover } from './SubjectSelectPopover'

interface NavBarButtonProps {
    icon: JSXElement,
    text: string,
    alwaysActive?: boolean
}

const NavBarButton: Component<NavBarButtonProps> = ({ icon, text, alwaysActive }) => (
    <IconButton
        size="xl" fontSize="$lg" variant="ghost"
        color="current" marginLeft="2" icon={icon}
        disabled={!alwaysActive && !progressStore.isSubjectSelected()}
        aria-label={`Перейти на страницу ${text}`}
    />
)

export const NavigationBar: Component = () => {
    const mainColor = useColorModeValue('$neutral6', '$neutral3');
    return (
        <Flex
            zIndex='$docked'
            flexDirection='row'
            p={5} m={0} width='100vw'
            position='fixed' bottom={0}
            justifyContent='space-around'
            bgColor={mainColor()}
        >
            <NavBarButton icon={<FiMenu />} text="главная" alwaysActive />
            <Link href='/tasks-statistics'>
                <NavBarButton icon={<ImStatsDots />} text="статистика" />
            </Link>
            <Link href='/treck-subject'>
                <NavBarButton icon={<BiTask />} text="выполнение заданий" />
            </Link>
            <SubjectSelectPopover size='xl' />
        </Flex>
    );
}