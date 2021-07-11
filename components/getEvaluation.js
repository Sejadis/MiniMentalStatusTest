import evaluationData from '../data/evaluationData.json';

const getEvaluation = (points) => {
  for (let key in evaluationData) {
    if (points <= key) {
      return evaluationData[key];
    }
  }
};

export default getEvaluation;
