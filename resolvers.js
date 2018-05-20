const Query = {
  quiz: async (root, { id: quiz_id }, { postgres }) => {
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
  createQuiz: async (root, { input }, { postgres }) => {
    try {
      const [quiz] = await postgres('quiz')
        .insert(input)
        .returning('*')
        .from('quiz');

      return quiz;
    } catch (e) {
      return e;
    }
  },
  createQuestion: async (root, { input }, { postgres }) => {
    try {
      const [question] = await postgres('question')
        .insert(input)
        .returning('*')
        .from('question');
      return question;
    } catch (e) {
      return e;
    }
  },
  createOptions: async (root, { input }, { postgres }) => {
    const promises = input.map(option => (postgres('option')
      .insert(option)
      .returning(['answer', 'option_id', 'question_id', { isCorrect: 'is_correct' }])
      .from('option')));

    const options = await Promise.all(promises);
    return options.map(option => option[0]);
  },
  addOption: async (root, { input }, { postgres }) => {
    const [option] = await postgres('option')
      .insert(input)
      .returning(['answer', 'option_id', 'question_id', { isCorrect: 'is_correct' }])
      .from('option');
    return option;
  },
};

const Quiz = {
  questions: async ({ quiz_id }, args, { postgres }) => {
    const questions = await postgres('question')
      .select()
      .where({ quiz_id });

    return questions;
  },
};


module.exports = { Query, Quiz, Mutation };
