
exports.up = function(knex, Promise) {
  return knex.schema.createTable('option', function (table) {
    table.increments('option_id').notNullable();
    table.string('answer', 500).notNullable();
    table.boolean('is_correct').notNullable().default(false);
    table.integer('question_id').references('question.question_id');
  });
};

exports.down = function(knex, Promise) {
  return next.schema.dropTable('option');
};
