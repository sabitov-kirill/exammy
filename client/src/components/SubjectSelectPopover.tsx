// Sabitov Kirill, 6/4/2022

import { Button, ButtonProps, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@hope-ui/solid";
import { VscOpenPreview } from 'solid-icons/vsc';
import { Component, For } from 'solid-js';

import { closeChooseSubjectNotify } from './Feedback';
import { subjectStore, subjects } from "../stores/store";

export const SubjectSelectPopover: Component<ButtonProps> = (props) => (
    <Popover>
        <PopoverTrigger
            {...props} as={Button} colorScheme='primary' variant='outline'
            px={10} leftIcon={<VscOpenPreview />}
        >
            {
                subjectStore.isSubjectSelected() ? 
                subjectStore.subject().name : 'Выбор предмета'
            }
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Выберите предмет:</PopoverHeader>
            <PopoverBody as={Flex} flexDirection='column' gap={5}>
            <For each={subjects}>
                {(subject) => (
                <Button
                    width='100%' colorScheme='neutral'
                    onclick={() => {
                        closeChooseSubjectNotify();
                        subjectStore.changeSubject(subject.key);
                    }}
                >
                    {subject.name}
                </Button>
                )}
            </For>
            </PopoverBody>
        </PopoverContent>
    </Popover>
)