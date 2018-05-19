const fakeQuiz = {
  quiz_id: 1323,
  name: 'Fake Quiz',
  weight: 80,
};

const questions = [
  {
    question_id: 1,
  },
  {
    question_id: 2,
  },
  {
    question_id: 3,
  },
];

const Query = {
  quiz: async () => fakeQuiz,
};

const Mutation = {
  createQuiz: async (root, { input }) => null,
  createQuestion: async (root, { input }) => null,
  createOptions: async (root, { input }) => null,
  addOption: async (root, { input }) => null,
};

const Quiz = {
  questions: () => questions,
};


module.exports = { Query, Quiz, Mutation };
