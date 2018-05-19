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
  addOption: async (root, { input }) => null,
};

const Quiz = {
  questions: () => null,
};


module.exports = { Query, Quiz, Mutation };
