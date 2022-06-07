// Sabitov Kirill, 6/3/2022

import { Button, Flex, Heading, IconButton, notificationService, useColorModeValue } from '@hope-ui/solid';
import { ImStatsDots } from 'solid-icons/im';
import { BiTask } from 'solid-icons/bi';
import { Component, JSXElement } from "solid-js";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { SubjectSelectPopover } from './SubjectSelectPopover';
import { Link, useMatch } from 'solid-app-router';

import { showChooseSubjectNotify } from  './Feedback';
import { subjectStore } from '../stores/store';
import { createWindowSize } from '../utils/createWindowSize';

type HeaderButtonProps = {
    text: string,
    href: string,
    icon: JSXElement
}

const HeaderButton: Component<HeaderButtonProps> = (props) => {
    const windowSize = createWindowSize();
    const match = useMatch(() => props.href);
    
    return (
        <Link href={subjectStore.isSubjectSelected() ? props.href : ''} replace={false}>
            {
                windowSize() > 1280 ?
                <Button
                    borderRadius={Boolean(match()) ? '$3xl' : '$md'}
                    variant={Boolean(match()) ? 'dashed' : 'outline'}
                    size={{ '@initial': 'sm', '@lg': 'md', '@2xl': 'lg' }}
                    leftIcon={props.icon} shadow='$sm'
                    onClick={showChooseSubjectNotify}
                >
                    {props.text}
                </Button> :
                <IconButton
                    borderRadius={Boolean(match()) ? '50%' : '$md'}
                    variant={Boolean(match()) ? 'dashed' : 'outline'}
                    size={{ '@initial': 'sm', '@lg': 'md' }}
                    icon={props.icon} aria-label={props.text} 
                    onClick={showChooseSubjectNotify}
                />
            }
        </Link>
    );
}

export const Header: Component = () => {
    const mainColor = useColorModeValue(
        'linear-gradient(270deg, rgb(119, 163, 175), rgb(154, 163, 209)91.1% )',
        'linear-gradient(to left, #9c2e44, #43529e)'
    );
    return (
        <Flex
            class='header'
            flexDirection='row' alignItems='center' shadow='$md'
            p={{ '@initial': 8, '@lg': 10, '@xl': 12 }}
            m={{ '@initial': 10, '@lg': 12, '@xl': 14 }}
            background={mainColor()} borderRadius='$sm'
            gap={{ '@initial': 10, '@md': 15, '@xl': 25 }}               
        >
            <Link href='/' replace={false}>
                <Heading fontSize='$3xl'>EGE Track Progress!</Heading>
            </Link>
            <HeaderButton icon={<ImStatsDots />} text='Статистика' href='/tasks-statistics' />
            <HeaderButton icon={<BiTask />} text='Выполнение заданий' href='/treck-subject' />
            <SubjectSelectPopover size={{ '@initial': 'sm', '@lg': 'md', '@2xl': 'lg' }} />
            <ColorModeSwitcher ml='auto' size={{ '@initial': 'sm', '@lg': 'md', '@2xl': 'lg' }} />
        </Flex>
    );
}