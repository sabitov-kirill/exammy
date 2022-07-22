// Sabitov Kirill, 6/11/2022

import React from "react";
import { 
    FlexProps,
    useColorModeValue
} from "@chakra-ui/react";
import { MotionFlex } from "./Motion";
import { scaleVariant, slideVariant } from "../theme";
import { MotionProps } from "framer-motion";

interface CardProps {
    children?: JSX.Element[] | JSX.Element,
}

export const Card = (props: CardProps & FlexProps & MotionProps) => {
    const background = useColorModeValue('backgroundLight.front', 'backgroundDark.front');

    return (
        <MotionFlex
            variants={scaleVariant} layout
            initial='initial' animate='visible' exit='exit'
            transition={{ duration: 0.3 }}
            flexDirection='column' p={4}
            borderRadius='3xl' gap={5} height='100%'
            background={background} shadow='sm'
            {...props}
        >{props.children}</MotionFlex>
    )
}