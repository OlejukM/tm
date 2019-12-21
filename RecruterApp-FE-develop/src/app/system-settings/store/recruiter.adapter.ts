import { createEntityAdapter } from '@ngrx/entity';
import { Recruiter } from '../recruiter';
import { RecruitersState } from './recruiters.reducers';

export const recruitersAdapter = createEntityAdapter<Recruiter>({
  selectId: (recruiter: Recruiter) => recruiter.id,
});

export const recruitersInitialState: RecruitersState = recruitersAdapter.getInitialState({
  count: 0,
});

export const { selectIds, selectEntities, selectAll, selectTotal } = recruitersAdapter.getSelectors();
