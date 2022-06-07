// Sabitov Kirill, 6/4/2022

import { createSignal } from "solid-js";

export function createWindowSize() {
    const [windowSize, setWindowSize] = createSignal(window.innerWidth);
    window.addEventListener('resize', () => {
        setWindowSize(window.innerWidth);
    });

    return windowSize;
}