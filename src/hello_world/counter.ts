import { SET_COUNTER } from '../application/constants';

export interface SetCounterAction {
    type: string;
    value: number;
}

export const incrementAction = (store: Store): SetCounterAction => ({
    type: SET_COUNTER,
    value: store.value() + 1,
});

export const decrementAction = (store: Store): SetCounterAction => ({
    type: SET_COUNTER,
    value: store.value() - 1,
});


export const reducer = (state: Store = new Store(0), action: SetCounterAction): Store => {
    if (action.value !== action.value || action.type !== SET_COUNTER) {
        return state;
    }
    return new Store(action.value);
}

export class Store {

    private _counterValue: number;

    constructor(counterValue: number) {
        this._counterValue = counterValue;
    }

    value(): number {
        return this._counterValue;
    }
}
