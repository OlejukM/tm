import { createEntityAdapter } from '@ngrx/entity';

import { ApplicationsState } from './applications.reducer';
import { Application } from '../applications';

export const applicationsAdapter = createEntityAdapter<Application>({
  selectId: (application: Application) => application.id,
});
export const initialApplicationState: ApplicationsState = applicationsAdapter.getInitialState({});

export const { selectIds, selectEntities, selectAll, selectTotal } = applicationsAdapter.getSelectors();
