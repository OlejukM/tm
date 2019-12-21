import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { CandidateQuestion } from '../candidate-question';

export enum CandidateApplicationTypes {
  GetCandidateQuestions = '[CANDIDATE QUESTIONS] Get Candidate  Questions',
  GetCandidateQuestionsSuccess = '[CANDIDATE QUESTIONS] Get Candidate Questions Success',
  PatchCandidateAnswer = '[CANDIDATE ANSWER] Patch Candidate Answer',
  PatchCandidateAnswerSuccess = '[CANDIDATE ANSWER] Patch Candidate Answer Success',
  SetCurrentQuestionId = '[CURRENT QUESTION ID] Set Current Question Id',
}

export class SetCurrentQuestion implements Action {
  readonly type = CandidateApplicationTypes.SetCurrentQuestionId;

  constructor(public payload: string) {}
}

export class GetCandidateQuestions implements Action {
  readonly type = CandidateApplicationTypes.GetCandidateQuestions;
}

export class GetCandidateQuestionsSuccess implements Action {
  readonly type = CandidateApplicationTypes.GetCandidateQuestionsSuccess;

  constructor(public payload: CandidateQuestion[]) {}
}

export class PatchCandidateAnswer implements Action {
  readonly type = CandidateApplicationTypes.PatchCandidateAnswer;

  constructor(
    public payload: {
      id: string;
      changes: Partial<CandidateQuestion>;
    }
  ) {}
}

export class PatchCandidateAnswerSuccess implements Action {
  readonly type = CandidateApplicationTypes.PatchCandidateAnswerSuccess;

  constructor(public payload: Update<CandidateQuestion>) {}
}

export type CandidateApplicationActions =
  | GetCandidateQuestions
  | GetCandidateQuestionsSuccess
  | PatchCandidateAnswer
  | PatchCandidateAnswerSuccess
  | SetCurrentQuestion;
