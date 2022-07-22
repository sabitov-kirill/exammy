// Sabitov Kirill, 6/4/2022

import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { GiBookshelf } from "react-icons/gi";
import {
    Button,
    ButtonProps,
    useBreakpoint,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    useColorModeValue,
    VStack,
    Text
} from "@chakra-ui/react";

import {
    RootState,
    subjects,
    changeSubject,
    SubjectKey,
} from "../store";
import { MotionButton, MotionVStack } from "./Motion";

const SubjectSelectListView = (props: SubjectSelectMenuProps) => {
    const color = useColorModeValue('neutral.100', 'neutral.200');

    return (
        <VStack px={5}>
        <Text fontSize={25}>Выбор предмета:</Text>
        {subjects.slice(1).map((subject) => (
            <MotionButton
                color={color} w='full'
                onClick={() => props.changeSubject(subject.key)}
                borderColor={color}
                variant={props.currentSubject.key == subject.key ?
                         'outline' : 'ghost'}
            >{subject.name}</MotionButton>
        ))}
        </VStack>
    )
}

const SubjectSelectMenuView = (props: SubjectSelectMenuProps) => {
    const color = useColorModeValue('neutral.100', 'neutral.200');
    const background = useColorModeValue('backgroundLight.front', 'backgroundDark.front');
    const buttonText = !props.isSubjectSelected ? 'Выбор предмета' : props.currentSubject.name;

    return (
        <Menu>
            <MenuButton
                as={Button} variant='outline'
                size={{ 'base':'lg', 'md':'md' }} 
                leftIcon={<GiBookshelf size={24}/>}
                {...props.trigerProps}
            >{buttonText}</MenuButton>
            <MenuList
                background={background}
            >
                {subjects.slice(1).map((subject) => (
                <MenuItem
                    key={subject.name} color={color}
                    onClick={() => props.changeSubject(subject.key)}
                >{subject.name}</MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

const connector = connect(
    (state: RootState) => ({
        isSubjectSelected: state.subject.isSubjectSelected,
        currentSubject: subjects[state.subject.subjectKey]
    }),
    (dispatch) => ({
        changeSubject: (subjectKey: SubjectKey) => 
            dispatch(changeSubject(subjectKey))
    })
)

type SubjectSelectMenuReduxProps = ConnectedProps<typeof connector>
interface SubjectSelectMenuProps extends SubjectSelectMenuReduxProps {
    trigerProps?: ButtonProps
}

export const SubjectSelectMenu = connector(SubjectSelectMenuView);
export const SubjectSelectList = connector(SubjectSelectListView);