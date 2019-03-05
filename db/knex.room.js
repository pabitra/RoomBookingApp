var knex = require('./knex.js');

function Rooms() {
    return knex('rooms');
}

function getAll() {
    return Rooms().select();
}

function getSingle(roomId) {
    return Rooms().where('id', parseInt(roomId)).first();
}

function add(room) {
    return Rooms().insert(room, 'id');
}

function update(roomId, updates) {
    return Rooms().where('id', parseInt(roomId)).update(updates);
}

function deleteItem(roomId) {
    return Customers().where('id', parseInt(roomId)).del();
}


module.exports = {
    getAll: getAll,
    getSingle: getSingle,
    add: add,
    update: update,
    deleteItem: deleteItem
};