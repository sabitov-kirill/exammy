// Sabitov Kirill, 6/11/2022

import { ComponentStyleConfig } from "@chakra-ui/react";

export const Button: ComponentStyleConfig = {
    baseStyle: {
        borderRadius: 'xl',
        color: 'white',
    },

    variants: {
        outline: {
            color: 'white',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'white',
            _hover: { background: 'blackAlpha.200' },
            _active: { background: 'blackAlpha.300' },
            borderRadius: 'md',
            shadow: 'md',
        },
        outlineRounded: {
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'white',
            _hover: { background: 'blackAlpha.200' },
            _active: { background: 'blackAlpha.300' },
            borderRadius: '3xl',
            shadow: 'md',
        },

        ghost: {
            background: 'transparent',
            _hover: { background: 'blackAlpha.200' },
            _active: { background: 'blackAlpha.300' },
            borderRadius: 'md',
        },

        smooth: {
            background: 'primary.100',
            _hover: { background: 'primary.200' },
            _active: { background: 'primary.300' },
            borderRadius: 'lg',
            shadow: 'md'
        },

        text: {
            color: 'accent.100',
            background: 'primary.100',
            _hover: { background: 'primary.200' },
            _active: { background: 'primary.300' },
            borderRadius: 'lg',
            shadow: 'md'
        },

        rounded: {
            color: 'accent.100',
            background: 'primary.100',
            _hover: { background: 'primary.200' },
            _active: { background: 'primary.300' },
            borderRadius: '3xl',
            shadow: 'md'
        },

        success: {
            background: 'success.100',
            _hover: { background: 'success.200' },
            _active: { background: 'success.300' },
            borderRadius: '3xl',
            shadow: 'md'
        },
        successOutlined: {
            color: 'success.100',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'success.100',
            _hover: { borderColor: 'success.200' },
            _active: { borderColor: 'success.300' },
            _disabled: { color: 'black' },
            background: 'transparent',
            borderRadius: '3xl',
            shadow: 'md'
        },

        error: {
            background: 'error.100',
            _hover: { background: 'error.200' },
            _active: { background: 'error.300' },
            _disabled: { color: 'black' },
            borderRadius: '3xl',
            shadow: 'md'
        },
        errorOutlined: {
            color: 'error.100',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: 'error.100',
            _hover: { borderColor: 'error.200' },
            _active: { borderColor: 'error.300' },
            _disabled: { color: 'black' },
            background: 'transparent',
            borderRadius: '3xl',
            shadow: 'md'
        },
    },
}