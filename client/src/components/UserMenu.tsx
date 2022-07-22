// Sabitov Kirill, 6/14/2022

import React from "react";
import { Avatar, Box, Button, Flex, HStack, IconButton, Image, Text } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, User, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { BiUser } from "react-icons/bi";

import "../firebase";
import { MdExitToApp } from "react-icons/md";

const auth = getAuth();

const UserSignedIn = (props: { user: User }) => {
    const avatar = props.user.photoURL ?
        <Image
            aria-label="Войти или зарегистрироваться"
            onClick={() => auth.signOut()}
            src={props.user.photoURL} w={10}
            shadow='md' borderRadius='md'
        /> :
        <IconButton
            aria-label="Войти или зарегистрироваться"
            onClick={() => auth.signOut()}
            icon={<BiUser fontSize={22} />}
            variant="outline"
        />
        

    return (
        <Flex alignItems='center' gap={3}>
            {avatar}
            <Text width='min-content' pt={0.5}>{props.user.displayName}</Text>
            <IconButton
                aria-label="Выйти из аккаунта"
                onClick={() => auth.signOut()}
                icon={<MdExitToApp fontSize={22} />}
                variant="outline" ml='auto'
            />
        </Flex>
    );
}

const UserNotSignedIn = () => {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    return (
        <IconButton
            aria-label="Войти или зарегистрироваться"
            onClick={signInWithGoogle} variant="outline"
            icon={<BiUser fontSize={22} />}
        />
    )
}

export const UserMenu = () => {
    const [user] = useAuthState(auth);
    console.log(user?.uid);
    
    if (user) return <UserSignedIn user={user}/>;
    return <UserNotSignedIn />
}