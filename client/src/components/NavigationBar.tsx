// Sabitov Kirill, 6/3/2022

import { IconButton, useColorModeValue, Flex } from "@hope-ui/solid"
import { Link, useMatch } from "solid-app-router"
import { BiTask } from "solid-icons/bi"
import { FiMenu } from "solid-icons/fi"
import { ImStatsDots } from "solid-icons/im"
import { Component, JSXElement } from "solid-js"

import { showChooseSubjectNotify } from "./Feedback"
import { subjectStore } from "../stores/store"
import { SubjectSelectPopover } from './SubjectSelectPopover'

interface NavBarButtonProps {
    href: string,
    icon: JSXElement,
    text: string,
    alwaysActive?: boolean
}

const NavBarButton: Component<NavBarButtonProps> = (props) => {
    const match = useMatch(() => props.href);
    return (
        <Link href={subjectStore.isSubjectSelected() ? props.href : '#'}>
            <IconButton
                size="lg" fontSize="$lg"
                variant={Boolean(match()) ? 'dashed' : 'ghost'}
                borderRadius='$3xl' _hover={{ borderRadius: '$3xl' }}
                color="current" marginLeft="2" icon={props.icon}
                aria-label={`Перейти на страницу ${props.text}`}
                onClick={showChooseSubjectNotify}
            />
        </Link>
    )
}

export const NavigationBar: Component = () => {
    const mainColor = useColorModeValue('$neutral6', '$neutral3');
    return (
        <Flex
            zIndex='$docked'
            flexDirection='row' gap={5}
            p={5} m={0} width='100vw'
            position='fixed' bottom={0}
            justifyContent='space-around'
            bgColor={mainColor()}
        >
            <NavBarButton href='/' icon={<FiMenu />} text="главная" alwaysActive />
            <NavBarButton href='/tasks-statistics' icon={<ImStatsDots />} text="статистика" />
            <NavBarButton href='/treck-subject'icon={<BiTask />} text="выполнение заданий" />
            <SubjectSelectPopover size='lg' />
        </Flex>
    );
}