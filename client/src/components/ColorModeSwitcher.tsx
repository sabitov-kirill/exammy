// Sabitov Kirill, 6/11/2022

import React from "react";
import { FaMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import {
    IconButtonProps,
    useColorMode,
    useColorModeValue 
} from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion"; 
import { fallVariant } from "../theme";
import { MotionIconButton } from "./Motion";

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label" | "icon">

export const ColorModeSwitcher = (props: ColorModeSwitcherProps) => {
    const { toggleColorMode } = useColorMode();
    const text = useColorModeValue("dark", "light");
    const SwitchIcon = useColorModeValue(<FaMoon />, <FiSun />);

    return (
        <AnimatePresence exitBeforeEnter initial={false}>
            <MotionIconButton
                key={text}
                variants={fallVariant} animate='visible'
                exit='exit' initial='initial' 
                transition={{ duration: 0.1 }}
                variant="ghost" marginLeft="2"
                onClick={toggleColorMode} icon={SwitchIcon}
                aria-label={`Switch to ${text} mode`}
                fontSize="xl" {...props}
            />
        </AnimatePresence>        
    )
}
