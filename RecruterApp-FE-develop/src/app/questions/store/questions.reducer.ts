import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';

import { Question } from '../question';
import * as fromQuestions from './question.actions';

const questionsAdapter = createEntityAdapter<Question>({
  selectId: (question: Question) => question.id,
});

const one = 1;

export interface QuestionsState extends EntityState<Question> {
  topics: string[];
  count: number;
}

const initialState: QuestionsState = questionsAdapter.getInitialState({
  topics: [],
  count: 0,
});

export function QuestionReducer(
  state: QuestionsState = initialState,
  action: fromQuestions.QuestionsActions
): QuestionsState {
  switch (action.type) {
    case fromQuestions.QuestionActionTypes.CreateQuestionSuccess: {
      return questionsAdapter.addOne(action.payload, { ...state, count: state.count + one });
    }

    case fromQuestions.QuestionActionTypes.GetQuestionsSuccess:
      return questionsAdapter.addMany(action.payload.items, {
        ...state,
        count: action.payload.count,
      });

    case fromQuestions.QuestionActionTypes.GetSortedQuestionsSuccess:
      return questionsAdapter.addAll(action.payload, state);

    case fromQuestions.QuestionActionTypes.GetTopicsSuccess:
      return {
        ...state,
        topics: action.payload.questionTopics,
      };

    case fromQuestions.QuestionActionTypes.UpdateQuestionSuccess:
      return questionsAdapter.updateOne(action.payload, state);

    case fromQuestions.QuestionActionTypes.DeleteQuestions:
      return questionsAdapter.removeMany(action.payload, state);

    case fromQuestions.QuestionActionTypes.AddTopicSuccess:
      return {
        ...state,
        topics: [...state.topics, action.payload],
      };

    default:
      return state;
  }
}

export const getQuestionsState = createFeatureSelector<QuestionsState>('question');

export const { selectIds, selectEntities, selectAll, selectTotal } = questionsAdapter.getSelectors(getQuestionsState);
