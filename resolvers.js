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
  createQuestion: async (root, { input }) => null,
  createOptions: async (root, { input }) => null,
  addOption: async (root, { input }) => null,
};

const Quiz = {
  questions: () => null,
};


module.exports = { Query, Quiz, Mutation };
