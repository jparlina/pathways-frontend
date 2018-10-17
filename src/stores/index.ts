import { combineReducers } from 'redux';
import * as fonts from './fonts';
import * as locale from './locale';
import * as questionnaire from './questionnaire';
import * as tasks from './tasks';
import * as services from './services';
import * as explore from './explore';
import * as taxonomies from './taxonomies';
import * as notifications from './notifications';

export interface Store {
    readonly fontsInStore: fonts.Store;
    readonly localeInStore: locale.LocaleStore;
    readonly questionnaireInStore: questionnaire.QuestionnaireStore;
    readonly tasksInStore: tasks.TaskStore;
    readonly servicesInStore: services.ServiceStore;
    readonly exploreSectionsInStore: explore.ExploreStore;
    readonly taxonomiesInStore: taxonomies.TaxonomyStore;
    readonly notificationsInStore: notifications.NotificationStore;
}

export const reducer = combineReducers<Store>({
    fontsInStore: fonts.reducer,
    localeInStore: locale.reducer,
    questionnaireInStore: questionnaire.reducer,
    tasksInStore: tasks.reducer,
    servicesInStore: services.reducer,
    exploreSectionsInStore: explore.reducer,
    taxonomiesInStore: taxonomies.reducer,
    notificationsInStore: notifications.reducer,
});
