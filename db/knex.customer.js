var knex = require('./knex.js');

function Customers() {
    return knex('customers');
}

function getAll() {
    return Customers().select();
}

function getSingle(customerId) {
    return Customers().where('id', parseInt(customerId)).first();
}

function add(customer) {
    return Customers().insert(customer, 'id');
}

function update(customerId, updates) {
    return Customers().where('id', parseInt(customerId)).update(updates);
}

function deleteItem(customerId) {
    return Customers().where('id', parseInt(customerId)).del();
}


module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    update: update,
    deleteItem: deleteItem
};