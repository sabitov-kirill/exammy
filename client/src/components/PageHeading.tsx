// Sabitov Kirill, 6/6/2022

import React from "react";
import { Heading } from "@chakra-ui/react";

export const PageHeading = (props: { text: string }) => (
    <Heading
        margin='auto' textAlign='center' color='primary.100'
        textTransform='uppercase' letterSpacing={5} fontSize='3xl'
    >
        {props.text}
    </Heading>
)