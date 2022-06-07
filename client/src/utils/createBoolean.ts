// Sabitov Kirill, 6/6/2022

import { createSignal } from "solid-js"

/**
 * Boolean with toggle creation.
 * @param initialValue value to be set while initialisation.
 * @returns boolean value accessor and toggle.
 */
export const createBoolean = (initialValue?: boolean) => {
    const [value, setValue] = createSignal<boolean>(initialValue ?? false);

    /**
     * Toggle boolean value.
     * @returns new value.
     */
    const toggle = () => setValue(v => !v);

    return [value, toggle];
}