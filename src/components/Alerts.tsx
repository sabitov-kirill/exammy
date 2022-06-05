// Sabitov Kirill, 6/5/2022

import { Alert, AlertIcon } from "@hope-ui/solid";

export const TaskSelectAlert = () => (
    <Alert status="info" width='100%'>
        <AlertIcon mr="$2_5" />
        Пожалуйста, выберите задание.
    </Alert>
);

export const SubjectSelectAlert = () => (
    <Alert status="danger" width='100%'>
        <AlertIcon mr="$2_5" />
        Пожалуйста, выберите предмет.
    </Alert>
);