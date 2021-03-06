import { Store } from '../../stores';
import { Id as TaskId } from '../../stores/topics';
import { isValidTaskServices, isErrorTaskServices, buildEmptyTasksServices } from '../../stores/services';
import { SelectorTopicServices } from './types';
import { toValidSelectorTaskServices } from './to_valid_selector_task_services';
import { toErrorSelectorTaskServices } from './to_error_selector_task_services';
import * as constants from '../../application/constants';

export const selectTaskServices = (topicId: TaskId, store: Store): SelectorTopicServices => {
    const topicServices = store.servicesInStore.taskServicesOrError[topicId] || buildEmptyTasksServices();
    if (isValidTaskServices(topicServices)) {
        return toValidSelectorTaskServices(topicServices, store.servicesInStore.services);
    }
    if (isErrorTaskServices(topicServices)) {
        return toErrorSelectorTaskServices(topicServices);
    }
    return { type: constants.TOPIC_SERVICES_LOADING };
};
