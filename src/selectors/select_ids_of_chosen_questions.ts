import { Store } from '../stores';
import { Id, AnswersMap } from '../stores/questionnaire';
import * as R from 'ramda';

export const selectIdsOfChosenAnswers = (appStore: Store): ReadonlyArray<Id> => (
    getIdsOfChosenAnswers(appStore.questionnaireInStore.answers)
);

export const getIdsOfChosenAnswers = (answers: AnswersMap): ReadonlyArray<Id> => (
    getIds(filterChosenAnswers(answers))
);

const getIds = (answers: AnswersMap): ReadonlyArray<Id> => (
    R.map(R.prop('id'), R.values(answers))
);

const filterChosenAnswers = (answers: AnswersMap): AnswersMap => (
    R.filter(R.propEq('isChosen', true), answers)
);
