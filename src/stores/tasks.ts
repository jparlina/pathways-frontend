import { buildTasksFixture } from '../fixtures/buildFixtures';
import { ValidStore, TaskList, Id } from '../fixtures/types/tasks';
import { Task as constants } from '../application/constants';
import * as UserStateActions from '../application/constants';
import * as helpers from './helpers/make_action';
import { ClearErrorAction } from './questionnaire/actions';
import { UserData } from './user_data';

export { Id, Task, TaskMap, TaskList } from '../fixtures/types/tasks';
export { ValidStore } from '../fixtures/types/tasks';

export type AddToSavedListAction = Readonly<ReturnType<typeof addToSavedList>>;
export type RemoveFromSavedListAction = Readonly<ReturnType<typeof removeFromSavedList>>;
export type ToggleCompletedAction = Readonly<ReturnType<typeof toggleCompleted>>;
type TaskAction = AddToSavedListAction |
    RemoveFromSavedListAction |
    ToggleCompletedAction |
    UserData.LoadRequestAction |
    UserData.LoadSuccessAction |
    UserData.LoadFailureAction |
    ClearErrorAction;

// tslint:disable-next-line:typedef
export const addToSavedList = (taskId: Id) => {
    const notificationText = 'Task added to my plan';
    return helpers.makeAction(constants.ADD_TO_SAVED_LIST, { taskId, notificationText });
};

// tslint:disable-next-line:typedef
export const removeFromSavedList = (taskId: Id) => (
    helpers.makeAction(constants.REMOVE_FROM_SAVED_LIST, { taskId })
);

// tslint:disable-next-line:typedef
export const toggleCompleted = (taskId: Id) => (
    helpers.makeAction(constants.TOGGLE_COMPLETED, { taskId })
);

export const buildDefaultStore = (): Store => (
    buildTasksFixture()
);

// TODO move to stores.ts
// tslint:disable-next-line:no-class
export class InvalidStore {
    readonly lastValidState: ValidStore;
    readonly error: string;

    constructor(lastValidState: ValidStore, error: string) {
        this.lastValidState = lastValidState;
        this.error = error;
    }
}

// TODO move to stores.ts
// tslint:disable-next-line:no-class
export class LoadingStore {
    readonly lastValidState: ValidStore;

    constructor(lastValidState: ValidStore) {
        this.lastValidState = lastValidState;
    }
}

export const toValidOrThrow = (store: Store): ValidStore => {
    if (store instanceof ValidStore) {
        return store;
    }
    throw new Error('Tried to access invalid task store');
};

export type Store = ValidStore | InvalidStore | LoadingStore;

export const reducer = (store: Store = buildDefaultStore(), action?: TaskAction): Store => {
    if (!action) {
        return store;
    }
    if (store instanceof LoadingStore) {
        return reduceLoadingStore(store, action);
    }
    if (store instanceof InvalidStore) {
        return reduceInvalidStore(store, action);
    }
    return reduceValidStore(store, action);
};

const reduceValidStore = (store: ValidStore, action: TaskAction): Store => {
    switch (action.type) {
        case constants.ADD_TO_SAVED_LIST:
            return addToTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.REMOVE_FROM_SAVED_LIST:
            return removeFromTaskList(store, 'savedTasksList', store.savedTasksList, action.payload.taskId);
        case constants.TOGGLE_COMPLETED:
            return toggleCompletedValue(store, action.payload.taskId);
        case UserStateActions.LOAD_USER_DATA_REQUEST:
            return new LoadingStore(store);
        default:
            return store;
    }
};

const reduceLoadingStore = (store: LoadingStore, action: TaskAction): Store => {
    switch (action.type) {
        case UserStateActions.LOAD_USER_DATA_SUCCESS:
            return new ValidStore({
                taskMap: store.lastValidState.taskMap,
                // TODO add validation on task ids from action
                savedTasksList: action.payload.savedTasks,
            });
        case UserStateActions.LOAD_USER_DATA_FAILURE:
            return new InvalidStore(store.lastValidState, action.payload.message);
        default:
            return store;
    }
};

const reduceInvalidStore = (store: InvalidStore, action: TaskAction): Store => {
    if (action.type === UserStateActions.CLEAR_ERROR_STATE) {
        return store.lastValidState;
    }
    return store;
};

const addToTaskList = (store: ValidStore, property: keyof (ValidStore), taskList: TaskList, value: Id): ValidStore => {
    if (taskList.indexOf(value) !== -1) {
        return store;
    }
    return new ValidStore({ ...store, [property]: [...taskList, value] });
};

const removeFromTaskList = (store: ValidStore, property: keyof (ValidStore), taskList: TaskList, value: Id): ValidStore => {
    if (taskList.indexOf(value) === -1) {
        return store;
    }
    return new ValidStore({ ...store, [property]: taskList.filter((id: Id) => id !== value) });
};

const toggleCompletedValue = (store: ValidStore, taskId: Id): ValidStore => {
    const task = store.taskMap[taskId];
    return new ValidStore({
        ...store,
        taskMap: {
            ...store.taskMap,
            [taskId]: {
                ...task,
                completed: !task.completed,
            },
        },
    });
};
