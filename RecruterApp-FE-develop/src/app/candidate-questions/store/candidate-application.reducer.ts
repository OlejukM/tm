import { EntityState } from '@ngrx/entity';

import { CandidateQuestion } from '../candidate-question';
import { initialCandidateApplicationState } from './candidate-application.adapter';
import * as fromActions from './candidate-application.actions';
import * as fromAdapter from './candidate-application.adapter';

export interface CandidateApplicationState extends EntityState<CandidateQuestion> {
  currentQuestionId: string;
}

export function CandidateApplicationReducer(
  state: CandidateApplicationState = initialCandidateApplicationState,
  action: fromActions.CandidateApplicationActions
): CandidateApplicationState {
  switch (action.type) {
    case fromActions.CandidateApplicationTypes.GetCandidateQuestionsSuccess:
      return fromAdapter.candidateApplicationAdapter.addAll(action.payload, state);
    case fromActions.CandidateApplicationTypes.PatchCandidateAnswerSuccess:
      return fromAdapter.candidateApplicationAdapter.updateOne(action.payload, state);

    case fromActions.CandidateApplicationTypes.SetCurrentQuestionId: {
      return {
        ...state,
        currentQuestionId: action.payload,
      };
    }
    default:
      return state;
  }
}
