const Query = {
  quiz: async (root, { id: quiz_id }, { postgres }) => { // eslint-disable-line camelcase
    try {
      const [data] = await postgres.select()
        .from('quiz')
        .where({ quiz_id });
      return data;
    } catch (e) {
      return e;
    }
  },
};

const Mutation = {
  createQuiz: async (root, { input }) => null,
  createQuestion: async (root, { input }, { postgres }) => {
    try {
      const [question] = await postgres('question')
        .insert(input)
        .returning('*')
        .from('question'); // eslint-disable-line camelcase
      return question;
    } catch (e) {
      return e;
    }
  },
  createOptions: async (root, { input }) => null,
  addOption: async (root, { input }, { postgres }) => {
    const [option] = await postgres('option')
      .insert(input)
      .returning(['answer', 'option_id', 'question_id', { isCorrect: 'is_correct' }])
      .from('option');
    return option;
  },
};

const Quiz = {
  questions: () => null,
};


module.exports = { Query, Quiz, Mutation };
