
exports.up = function(knex, Promise) {
    return knex.schema.createTable('customers', function(table){
        table.increments('id').primary();
        table.string('username', 50).notNullable();
        table.string('firstname', 100).notNullable();
        table.string('lastname', 100).notNullable();
        table.datetime('dob').notNullable();
        table.string('email', 100).notNullable().unique();
        table.string('password', 8).notNullable();
        table.integer('status').notNullable();
        table.string('phone', 12).nullable();
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('customers');
};
