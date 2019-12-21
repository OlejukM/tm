import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Question } from '../question';
import { HttpParamsInterface } from '../http-params-interface';
import { QuestionList } from '../questions-library/question-list';
import { Topics } from '../questions-library/topics';

export enum QuestionActionTypes {
  CreateQuestion = '[QUESTIONS] Create Question',
  CreateQuestionSuccess = '[QUESTIONS] Create Question Success',
  GetQuestions = '[QUESTIONS] Get Questions',
  GetQuestionsSuccess = '[QUESTIONS] Get Questions Success',
  GetSortedQuestions = '[QUESTIONS] Get Sort Questions',
  GetSortedQuestionsAndDelete = '[QUESTIONS] Get Sort Questions and delete',
  GetSortedQuestionsSuccess = '[QUESTIONS] Get Sort Questions Success',
  UpdateQuestion = '[QUESTIONS] Update Questions',
  UpdateQuestionSuccess = '[QUESTIONS] Update Questions Success',
  GetTopics = '[TOPICS] Get Question topics',
  GetTopicsSuccess = '[TOPICS] Get Question topics Success',
  DeleteQuestions = '[TOPICS] Delete Questions',
  AddTopic = '[TOPICS] Add topic',
  AddTopicSuccess = '[TOPICS] Add topic success',
}

export class CreateQuestion implements Action {
  readonly type = QuestionActionTypes.CreateQuestion;

  constructor(public payload: Question) {}
}

export class CreateQuestionSuccess implements Action {
  readonly type = QuestionActionTypes.CreateQuestionSuccess;

  constructor(public payload: Question) {}
}

export class GetQuestions implements Action {
  readonly type = QuestionActionTypes.GetQuestions;

  constructor(public payload: HttpParamsInterface) {}
}

export class GetQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.GetQuestionsSuccess;

  constructor(public payload: QuestionList) {}
}

export class GetSortedQuestions implements Action {
  readonly type = QuestionActionTypes.GetSortedQuestions;

  constructor(public payload: HttpParamsInterface) {}
}

export class GetSortedQuestionsAndDelete implements Action {
  readonly type = QuestionActionTypes.GetSortedQuestionsAndDelete;

  constructor(
    public payload: {
      params: HttpParamsInterface;
      ids: string[];
    }
  ) {}
}

export class GetSortedQuestionsSuccess implements Action {
  readonly type = QuestionActionTypes.GetSortedQuestionsSuccess;

  constructor(public payload: Question[]) {}
}

export class GetTopics implements Action {
  readonly type = QuestionActionTypes.GetTopics;
}

export class GetTopicsSuccess implements Action {
  readonly type = QuestionActionTypes.GetTopicsSuccess;

  constructor(public payload: Topics) {}
}

export class UpdateQuestion implements Action {
  readonly type = QuestionActionTypes.UpdateQuestion;

  constructor(
    public payload: {
      id: string;
      changes: Partial<Question>;
    }
  ) {}
}

export class UpdateQuestionSuccess implements Action {
  readonly type = QuestionActionTypes.UpdateQuestionSuccess;

  constructor(public payload: Update<Question>) {}
}

export class DeleteQuestions implements Action {
  readonly type = QuestionActionTypes.DeleteQuestions;

  constructor(public payload: string[]) {}
}

export class AddTopic implements Action {
  readonly type = QuestionActionTypes.AddTopic;

  constructor(public payload: string) {}
}

export class AddTopicSuccess implements Action {
  readonly type = QuestionActionTypes.AddTopicSuccess;

  constructor(public payload: string) {}
}

export type QuestionsActions =
  | CreateQuestion
  | CreateQuestionSuccess
  | GetQuestions
  | GetQuestionsSuccess
  | GetSortedQuestions
  | GetSortedQuestionsSuccess
  | GetSortedQuestionsAndDelete
  | UpdateQuestion
  | UpdateQuestionSuccess
  | GetTopics
  | GetTopicsSuccess
  | DeleteQuestions
  | AddTopic
  | AddTopicSuccess;
