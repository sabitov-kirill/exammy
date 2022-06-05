// Sabitov Kirill, 6/3/2022

import { Button, Flex, Heading, IconButton, useColorModeValue } from '@hope-ui/solid'
import { ImStatsDots } from 'solid-icons/im'
import { BiTask } from 'solid-icons/bi'
import { Component, JSXElement } from "solid-js"

import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { SubjectSelectPopover } from './SubjectSelectPopover'
import { Link, NavLink } from 'solid-app-router'
import progressStore from '../stores/progressStore'
import { useWindowSize } from '../stores/useWindowSize'

type HeaderButtonProps = {
    text: string,
    href: string,
    icon: JSXElement
}

const HeaderButton: Component<HeaderButtonProps> = (props) => {
    const windowSize = useWindowSize();
    return (
        <Link href={props.href} replace={true}>
            {
                windowSize() > 1280 ?
                <Button
                    size={{ '@initial': 'sm', '@lg': 'md' }}
                    leftIcon={props.icon}
                    disabled={!progressStore.isSubjectSelected()}
                >
                    {props.text}
                </Button> :
                <IconButton 
                    size={{ '@initial': 'sm', '@lg': 'md' }}
                    disabled={!progressStore.isSubjectSelected()}
                    icon={props.icon} aria-label={props.text} 
                />
            }
        </Link>
    );
}

export const Header: Component = () => {
    const mainColor = useColorModeValue('$neutral6', '$blackAlpha10');
    return (
        <Flex
            flexDirection='row' alignItems='center'
            p={{ '@initial': 10, '@lg': 12, '@xl': 14 }}
            m={{ '@initial': 10, '@lg': 12, '@xl': 14 }}
            bgColor={mainColor()} borderRadius='$md'
            gap={{ '@initial': 10, '@md': 15, '@xl': 25 }}               
        >
            <Heading fontSize='$3xl'>EGE Track Progress!</Heading>
            <HeaderButton icon={<ImStatsDots />} text='Статистика' href='/tasks-statistics' />
            <HeaderButton icon={<BiTask />}text='Выполнение заданий' href='/treck-subject' />
            <SubjectSelectPopover size={{ '@initial': 'sm', '@lg': 'md' }} />
            <ColorModeSwitcher ml='auto' />
        </Flex>
    );
}