// Sabitov Kirill, 6/11/2022

import React from 'react'
import { Spinner } from "@chakra-ui/react";

export const Loading = () => {
    return (
        <Spinner
            position='absolute' 
            left='0' right='0'
            mx='auto' top={[100, 200, 300]}
            thickness='4px'
            speed='0.65s'
            emptyColor='white'
            color='primary.100'
            size='xl'
        />
    );
}
