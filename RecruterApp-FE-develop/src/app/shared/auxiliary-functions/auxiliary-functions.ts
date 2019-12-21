import { CandidateQuestion, Type } from '../../candidate-questions/candidate-question';

const generateIdValues = {
  radix: 36,
  characterToStartFrom: 2,
  characterToEnd: 15,
};
const incrementQuestionTitleIndex = 1;

export function mapQuestion(questions: CandidateQuestion[]): CandidateQuestion[] {
  return questions.map((question, index) => {
    if (question && question.isDone) {
      return { ...question, status: 'done' };
    } else if (question && !question.isDone) {
      return { ...question, status: 'continue' };
    } else {
      return getQuestionPlaceholder(index);
    }
  });
}

export function getQuestionPlaceholder(index: number): CandidateQuestion {
  return {
    id: generateQuickGuid(),
    title: `Question ${index + incrementQuestionTitleIndex}`,
    status: 'locked',
    type: Type.locked,
  };
}

export function generateQuickGuid(): string {
  return (
    Math.random()
      .toString(generateIdValues.radix)
      .substring(generateIdValues.characterToStartFrom, generateIdValues.characterToEnd) +
    Math.random()
      .toString(generateIdValues.radix)
      .substring(generateIdValues.characterToStartFrom, generateIdValues.characterToEnd)
  );
}
