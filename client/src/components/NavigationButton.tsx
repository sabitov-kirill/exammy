// Sabitov Kirill, 6/11/2022

import React from "react";
import { Box, Button, Flex, FlexProps, Heading, IconButton, useBreakpoint } from "@chakra-ui/react";
import { connect, ConnectedProps } from "react-redux";
import { useMatch, Link } from "react-router-dom";

import { RootState } from "../store";
import { MotionBox } from "./Motion";
import { LogoIcon } from "./Logo";
import { AnimatePresence } from "framer-motion";
import { fallVariant, slideVariant } from "../theme";

type NavigationButtonProps = {
    alwaysActive?: boolean,
    text: string,
    to: string,
    icon?: JSX.Element
}

export const Underline = () => {
    return (
        <MotionBox
            layoutId='navigationActive'
            position='absolute'
            h={1} 
            bottom={0}
            width='full'
            borderRadius='3xl'
            bg='accent.100'
        />
    );
}

const NavigationButtonView = (props: NavigationButtonPropsFromRedux 
                              & { color?: string } ) => {
    const breackpoint = useBreakpoint();
    const match = useMatch(props.to);
    const color = Boolean(match) ?
        'accent.100' : props.color ?? 'white';
    const underline = Boolean(match) ?
        <Underline /> : <></>;
    
    return (
        <Box w='fit-content' h='fit-content'>
            <Link to={(props.isSubjectSelected || props.alwaysActive) ? props.to : '#'}>
                {breackpoint === 'xl' || breackpoint === '2xl' ?
                <Button
                    variant='ghost'
                    color={color}
                    size={['sm', 'md']} 
                    leftIcon={props.icon}
                >
                    {props.text}
                    {underline}
                </Button> :

                breackpoint === 'md' || breackpoint === 'lg' ?
                <IconButton
                    variant={'ghost'}
                    color={color}
                    icon={<>{props.icon} {underline}</>} 
                    aria-label={`Перейти на страницу {props.text}`} 
                /> :

                <IconButton
                    size="lg" fontSize="lg"
                    icon={<>{props.icon} {underline}</>}
                    color={color}
                    variant={'ghost'}
                    aria-label={`Перейти на страницу {props.text}`}
                />
                }
            </Link>
        </Box>
    );
}

export const NavigationButtonToMain = () => {
    const match = Boolean(useMatch('/'));
    const key = match ? 
        'activeNavigationButtonToMain' :
        'inactiveNavigationButtonToMain'
    
    return(
        <Link to='/'>
            <Flex gap={0} direction='row'>
            <Heading
                mt={1} fontSize='3xl'
                fontFamily="'Raleway', sans-serif"
                fontWeight={100}
                letterSpacing={10}
                textTransform='uppercase'
                verticalAlign='center'
            >Ex</Heading>
            <AnimatePresence initial={false} exitBeforeEnter>
                <MotionBox
                    variants={fallVariant}
                    initial='initial'
                    animate='visible' 
                    exit='exit' key={key}
                >
                <LogoIcon mr={2} fontSize={40} color={
                    match ? 'accent.100' : 'white'
                }/>
                </MotionBox>
            </AnimatePresence>
            <Heading
                mt={1} fontSize='3xl'
                fontFamily="'Raleway', sans-serif"
                fontWeight={100}
                letterSpacing={10}
                textTransform='uppercase'
                verticalAlign='center'
            >mmy</Heading>
            </Flex>
        </Link>
    );
}

type NavigationButtonPropsFromRedux = ConnectedProps<typeof connector> & NavigationButtonProps
const connector = connect(
    (state: RootState) => ({
        isSubjectSelected: state.subject.isSubjectSelected,
    }),
)

export const NavigationButton = connector(NavigationButtonView);