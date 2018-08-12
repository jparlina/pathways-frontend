import * as model from '../../stores/questionnaire';
import { getLocalizedText } from '../locale/get_localized_text';
import { Locale } from '../../locale/types';
import { toValidOrThrow } from '../../stores/questionnaire/stores';
import { QuestionList, Answer } from './types';
import { toSelectorAnswerList } from './to_selector_answer_list';
import { filterAnswerIdsToGivenQuestion } from './filter_answer_ids_to_given_question';

export const buildQuestionList = (locale: Locale, modelStore: model.Store): QuestionList => {
    const { questions, answers }: model.ValidStore = toValidOrThrow(modelStore);

    return Object.keys(questions).map((key: string, index: number) => {
        const question: model.Question = questions[key];
        return {
            id: question.id,
            number: index + 1,
            text: getLocalizedText(locale, question.text),
            explanation: question.explanation ? getLocalizedText(locale, question.explanation) : undefined,
            answers: selectAnswersForQuestion(locale, question, answers),
        };
    });
};

const selectAnswersForQuestion = (locale: Locale, question: model.Question, answers: model.AnswersMap): ReadonlyArray<Answer> => {
    const keys = filterAnswerIdsToGivenQuestion(question.id, answers);

    return toSelectorAnswerList(locale, keys, answers, question.acceptMultipleAnswers);
};
