import { createEntityAdapter } from '@ngrx/entity';

import { CandidateQuestion } from '../candidate-question';
import { CandidateApplicationState } from './candidate-application.reducer';

export const candidateApplicationAdapter = createEntityAdapter<CandidateQuestion>({
  selectId: (candidateApplication: CandidateQuestion) => {
    return candidateApplication ? candidateApplication.id : null;
  },
});

export const initialCandidateApplicationState: CandidateApplicationState = candidateApplicationAdapter.getInitialState({
  currentQuestionId: '',
});
export const { selectIds, selectEntities, selectAll, selectTotal } = candidateApplicationAdapter.getSelectors();
