// Sabitov Kirill, 6/4/2022

import { Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger } from "@hope-ui/solid"
import { VscOpenPreview } from 'solid-icons/vsc'
import { Component, For } from 'solid-js'

import progressStore from '../stores/progressStore'
import { subject, subjectsKeys } from '../stores/subjects'

export const SubjectSelectPopover: Component<{ size: any }> = (props) => (
    <Popover>
        <PopoverTrigger
            as={Button} variant='outline'
            size={props.size} px={10} leftIcon={<VscOpenPreview />}
        >
            {
                progressStore.isSubjectSelected() ? 
                subject(progressStore.subjectKey()).name : 'Выбор предмета'
            }
        </PopoverTrigger>
        <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>Выберите предмет:</PopoverHeader>
            <PopoverBody as={Flex} flexDirection='column' gap={5}>
            <For each={subjectsKeys}>
                {(subjectKey) => (
                <Button width='100%' onclick={() => {
                    progressStore.changeSubject(subjectKey)
                }}>
                    {subject(subjectKey).name}
                </Button>
                )}
            </For>
            </PopoverBody>
        </PopoverContent>
    </Popover>
)