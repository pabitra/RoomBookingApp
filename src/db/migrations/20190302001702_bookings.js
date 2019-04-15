
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bookings', function(table){
        table.increments('id').primary();
        table.integer('roomid', 100).notNullable();
        table.integer('customerid', 100).notNullable();
        table.datetime('startdate').notNullable();
        table.datetime('enddate').notNullable();
        table.datetime('bookingdate').notNullable();
        table.string('status', 1).notNullable();  //b for booked, //c for cancelled 
       
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bookings');
};
