// Sabitov Kirill, 6/11/2022

import { Variants } from "framer-motion";

export const fallVariant: Variants = {
    initial: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
    exit: { y: 20, opacity: 0 },
}

export const slideVariant: Variants = {
    initial: { x: -20, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: 20, opacity: 0 },
}

export const scaleVariant: Variants = {
    initial: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
}