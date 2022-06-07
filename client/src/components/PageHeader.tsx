// Sabitov Kirill, 6/6/2022

import { Heading } from "@hope-ui/solid";
import { Component } from "solid-js";

export const PageHeader: Component<{ text: string }> = (props) => (
    <Heading
        margin='auto' textAlign='center' color='$primary9'
        textTransform='uppercase' letterSpacing={5} fontSize='$3xl'
    >
        {props.text}
    </Heading>
)