// Sabitov Kirill, 6/4/2022

import { useState } from "react";

/**
 * A hook that provides the ability to track the size of the window.
 * @returns window size hook.
 */
export function useWindowSize() {
    const [windowSize, setWindowSize] = useState(window.innerWidth);
    window.addEventListener('resize', () => {
        setWindowSize(window.innerWidth);
    });

    return windowSize;
}