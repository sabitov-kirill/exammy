// Sabitiv Kirill, 6/11/2022

import { extendTheme, ThemeConfig } from "@chakra-ui/react";

import { colors } from "./colors";
import { styles } from "./styles";
import { fonts } from "./fonts";
import { Button } from "./components/button";
import { Tooltip } from "./components/tooltip";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

const overrides = {
    styles,
    colors,
    config,
    fonts,
    components: {
        Button,
        Tooltip
    }
}

export const theme = extendTheme(overrides)

export * from './animationVariants'