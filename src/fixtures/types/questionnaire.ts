import { LocalizedText } from '../../locale';

export type Id = string;

export interface Question {
    readonly id: Id;
    readonly text: LocalizedText;
    readonly explanation?: LocalizedText;
    readonly acceptMultipleAnswers: boolean;
}

export interface QuestionsMap {
    readonly [key: string]: Question;
}

export interface Answer {
    readonly id: Id;
    readonly questionId: Id;
    readonly text: LocalizedText;
    readonly isSelected: boolean;
}

export interface AnswersMap {
    readonly [key: string]: Answer;
}

export interface Store {
    readonly questions: QuestionsMap;
    readonly answers: AnswersMap;
}