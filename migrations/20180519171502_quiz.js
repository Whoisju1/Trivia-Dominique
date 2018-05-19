
exports.up = function(knex, Promise) {
  return knex.schema.createTable('quiz', function (table) {
    table.increments('quiz_id');
    table.string('name', 300).notNullable();
    table.integer('benchmark').notNullable();
  });
};

exports.down = function(knex, Promise) {
  knex.schema.dropTable('quiz');
};
