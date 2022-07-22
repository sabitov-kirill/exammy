// Sabitov Kirill, 6/11/2022

export const styles = {
    global: (props: any) => ({
        'html, body': {
            background: 
                props.colorMode === 'light' ?
                'backgroundLight.back' :
                'backgroundDark.back',
        },
    }),
};