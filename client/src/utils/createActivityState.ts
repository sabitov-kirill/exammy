// Sabitov Kirill, 6/6/2022

import { createSignal } from "solid-js";

export type ActivityState = 'notStarted' | 'started' | 'ended';
export type ToggleActivityCallback = {
    onStarted?: () => void,
    onEnded?: () => void,
    onRestarted?: () => void,
}

/**
 * Activity state creation.
 * @param options describes wheather activity can be restarted and sets initial state.
 * @returns activity state and activity state manipulators.
 */
export const createActivityState = (options?: { canRestart?: boolean, initialState?: ActivityState }) => {
    const [state, setState] = createSignal<ActivityState>(options?.initialState ?? 'notStarted');

    /**
     * State toggle function.
     * @param callback callback on each type of ActivityState.
     * @returns new state.
     */
    const toggleState = (callback?: ToggleActivityCallback): string => setState((currentState) => {
        switch(currentState) {
            case 'notStarted':
                if (callback?.onStarted) callback?.onStarted();
                return 'started';

            case 'started':
                if (callback?.onEnded) callback?.onEnded();
                return 'ended';

            case 'ended':
                if ((options?.canRestart ?? false) && callback?.onRestarted) {
                    callback?.onRestarted();
                    return 'started';
                } else {
                    return 'ended';
                }
        }
    });

    /**
     * Force change activity state.
     * @param state state to be set.
     * @returns new state.
     */
    const forceSetState = (state: ActivityState) => setState(state);

    return { state, toggleState, forceSetState };
}