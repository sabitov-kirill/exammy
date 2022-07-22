// Sabitov Kirll, 6/11/2022

import React from "react";
import { Flex, Heading, Icon, IconProps } from "@chakra-ui/react";

export const LogoIcon = (props: IconProps) => (
    <Icon 
        viewBox="0 0 200 200"
        {...props}
    >
        <path fill='currentColor' d="M100.2 2.7C95 10.2.6 168.7.2 170.5c-.2 1.2.2 2.6 1 3.2.7.5 24.3 6.7 52.3 13.7l51 12.7 46.5-12.7c25.6-6.9 47.1-13.1 47.8-13.6.6-.6 1.2-1.7 1.2-2.5 0-1.6-90.4-166.7-92.8-169.6-2.2-2.5-4.8-2.1-7 1zm-.2 85.8V142H83.9c-12.5 0-16-.3-15.6-1.3.2-.6 7.3-24.7 15.8-53.5C92.5 58.5 99.6 35 99.7 35c.2 0 .3 24.1.3 53.5zm50.7 9c18.2 33 33.5 61 34.2 62.3 1.4 2.7 4.6 3.8-24.5-8.7l-19.2-8.2-1-4.2c-3-11.8-24.2-102.6-24.2-103.3.1-1.1-4-8.5 34.7 62.1zM76.6 83.1c-7.4 25-14.3 48.6-15.5 52.5l-2.1 7.2-21.5 9.2c-11.9 5.1-21.7 9.1-21.9 8.9-.2-.2 16.3-28.2 36.6-62.2 20.4-33.9 37.3-61.6 37.4-61.4.2.2-5.6 20.8-13 45.8zm43.9 8.6c6.3 27 11.5 49.3 11.5 49.7 0 .4-5.3.5-11.7.4l-11.8-.3-.3-49.9c-.1-27.5 0-49.7.2-49.5.3.3 5.7 22.6 12.1 49.6zM100 170c0 12.9-.4 20-1 20-1.5 0-77.1-18.9-79.4-19.8-1.3-.6 3.8-3.2 20.5-10.4l22.4-9.7h18.8l18.7-.1v20zm59.2-10.3c12.5 5.4 22.4 10.1 22 10.4-.7.7-70.5 19.9-72.3 19.9-.5 0-.9-8.3-.9-20v-20h28.5l22.7 9.7z"/>
    </Icon>
)

export const Logo = () => (
    <Flex gap={0} direction='row'>
    <Heading
        mt={1}
        fontSize='3xl'
        fontWeight={100}
        fontFamily="'Raleway', sans-serif"
        letterSpacing={10}
        textTransform='uppercase'
        verticalAlign='center'
    >Ex</Heading>
    <LogoIcon mr={2} fontSize={40} color='white'/>
    <Heading
        mt={1}
        fontSize='3xl'
        fontWeight={100}
        fontFamily="'Raleway', sans-serif"
        letterSpacing={10}
        textTransform='uppercase'
        verticalAlign='center'
    >mmy</Heading>
    </Flex>
)