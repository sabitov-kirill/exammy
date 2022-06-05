import { IconButton, IconButtonProps, useColorMode, useColorModeValue } from "@hope-ui/solid"
import { FaMoon } from "solid-icons/fa"
import { FiSun } from 'solid-icons/fi'
import { Component } from "solid-js"

type ColorModeSwitcherProps = Omit<IconButtonProps, "aria-label" | "icon">

export const ColorModeSwitcher: Component<ColorModeSwitcherProps> = (props) => {
  const { toggleColorMode } = useColorMode()
  const text = useColorModeValue("dark", "light")
  const SwitchIcon = useColorModeValue(<FaMoon />, <FiSun />)

  return (
    <IconButton
      size="md"
      fontSize="lg"
      variant="ghost"
      color="current"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={SwitchIcon()}
      aria-label={`Switch to ${text} mode`}
      {...props}
    />
  )
}
