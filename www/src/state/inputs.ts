
export const RAW_INPUTS = {
    punch: false,
}

export type InputState = {
    keys: number[],
    active: boolean,
    pressed: boolean,
    released: boolean,
    raw?: boolean,
}

export enum InputKeys {
    RIGHT,
    LEFT,
    UP,
    DOWN,
    SHIFT,
    PUNCH
}

export const inputsState: Record<InputKeys, InputState> = {
    [InputKeys.PUNCH]: {
        keys: [32],
        active: false,
        pressed: false,
        released: false,
        raw: false,
    },
    [InputKeys.RIGHT]: {
        keys: [68, 39],
        active: false,
        pressed: false,
        released: false,
    },
    [InputKeys.LEFT]: {
        keys: [65, 37],
        active: false,
        pressed: false,
        released: false,
    },
    [InputKeys.UP]: {
        keys: [87, 38],
        active: false,
        pressed: false,
        released: false,
    },
    [InputKeys.DOWN]: {
        keys: [83, 40],
        active: false,
        pressed: false,
        released: false,
    },
    [InputKeys.SHIFT]: {
        keys: [16],
        active: false,
        pressed: false,
        released: false,
    },
}