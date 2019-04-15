
exports.up = function(knex, Promise) {
    return knex.schema.createTable('rooms', function(table){
        table.increments('id').primary();
        table.string('roomtype', 1).notNullable();
        table.decimal('rent', 10, 2).notNullable();  
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('rooms');
};
