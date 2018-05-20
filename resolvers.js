const Query = {
  quiz: async (root, { id: quiz_id }, { postgres }) => {
    try {
      const [data] = await postgres.select()
        .from('quiz')
        .where({ quiz_id });
      return data;
    } catch (err) {
      return err;
    }
  },
  quizzes: async (root,
    { limit = 10, offset = 0 },
    { postgres }) => postgres('quiz')
    .select()
    .limit(limit)
    .offset(offset),
};

const Mutation = {
  createQuiz: async (root, { input }, { postgres }) => {
    try {
      const [quiz] = await postgres('quiz')
        .insert(input)
        .returning('*')
        .from('quiz');

      return quiz;
    } catch (err) {
      return err;
    }
  },
  createQuestion: async (root, { input }, { postgres }) => {
    try {
      const [question] = await postgres('question')
        .insert(input)
        .returning('*')
        .from('question');
      return question;
    } catch (err) {
      return err;
    }
  },
  createOptions: async (root, { input }, { postgres }) => {
    try {
      const promises = input.map(option => (postgres('option')
        .insert(option)
        .returning(['answer', 'option_id', 'question_id', { isCorrect: 'is_correct' }])
        .from('option')));

      const options = await Promise.all(promises);
      return options.map(option => option[0]);
    } catch (err) {
      return err;
    }
  },
  addOption: async (root, { input }, { postgres }) => {
    try {
      const [option] = await postgres('option')
        .insert(input)
        .returning(['answer', 'option_id', 'question_id', { isCorrect: 'is_correct' }])
        .from('option');
      return option;
    } catch (err) {
      return err;
    }
  },
};

const Quiz = {
  questions: async ({ quiz_id }, args, { postgres }) => {
    try {
      const questions = await postgres('question')
        .select()
        .where({ quiz_id });

      return questions;
    } catch (err) {
      return err;
    }
  },
};

const Question = {
  quiz: async ({ quiz_id }, args, { postgres }) => {
    try {
      const [quiz] = await postgres('quiz')
        .select()
        .where({ quiz_id });

      return quiz;
    } catch (err) {
      return err;
    }
  },
  options: async ({ question_id }, args, { postgres }) => {
    try {
      const options = await postgres('option')
        .select('option_id', 'answer', 'question_id', { isCorrect: 'is_correct' })
        .where({ question_id });

      return options;
    } catch (err) {
      return err;
    }
  },
};

const Option = {
  question: async ({ question_id }, args, { postgres }) => {
    try {
      const [question] = await postgres('question')
        .select('question_id', 'question', 'quiz_id')
        .where({ question_id });

      return question;
    } catch (err) {
      return err;
    }
  },
};

module.exports = {
  Query,
  Quiz,
  Mutation,
  Question,
  Option,
};
