
exports.up = function(knex, Promise) {
  return knex.schema.createTable('question', function(table) {
    table.increments('question_id').notNullable();
    table.string('question').notNullable().unique();
    table.integer('quiz_id').references('quiz.quiz_id').notNullable();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('question');
};
