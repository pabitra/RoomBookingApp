
exports.up = function(knex, Promise) {
    return knex.schema.createTable('bookings', function(table){
        table.increments('id').primary();
        table.integer('roomid').notNullable().references('rooms.id');
        table.integer('customerid').notNullable().references('customers.id');
        table.datetime('startdate').notNullable();
        table.datetime('enddate').notNullable();
        table.datetime('bookingdate').notNullable();
        table.string('status', 1).notNullable();  //b for booked, //c for cancelled 
       
      });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('bookings');
};
