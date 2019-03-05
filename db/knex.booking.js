var knex = require('./knex.js');

function Bookings() {
    return knex('bookings');
}

function getAll() {
    return Bookings().select();
}

function getSingle(bookingId) {
    return Bookings().where('id', parseInt(bookingId)).first();
}

function add(booking) {
    return Bookings().insert(booking, 'id');
}

function deleteItem(bookingId) {
    return Bookings().where('id', parseInt(bookingId)).del();
}

module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    deleteItem: deleteItem
};