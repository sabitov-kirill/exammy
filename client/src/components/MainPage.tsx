// Sabitov Kirill, 6/4/2022

import { Container, Flex, HStack, Text } from "@hope-ui/solid";
import { createWindowSize } from "../utils/createWindowSize";
import { ColorModeSwitcher } from "./ColorModeSwitcher";

import { PageHeader } from "./PageHeader";

const MainPage = () => {
    const windowSize = createWindowSize();
    return (
        <Flex flexDirection='column' gap={20}>
            <PageHeader text="Главная страница" />
            { windowSize() < 768 &&
                <HStack mx='auto'>
                    Переключить тему - 
                    <ColorModeSwitcher />
                </HStack>
            }<br/>
            <Container width='fit-content' mx='auto'>
            <Text color='$accent10'>
                Жаль, что Саша Л. так и не помогла с главной страничкой......
            </Text>
            </Container>
        </Flex>
    )
}

export default MainPage;