// Sabitov Kirill, 6/13/2022

import React from "react";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

export const SubjectNotSelectedAlert = () => (
    <Alert status='error' borderRadius='3xl'>
        <AlertIcon />
        <AlertTitle>Ошибка!</AlertTitle>
        Пожалуйста, выберите предмет.
    </Alert>
)