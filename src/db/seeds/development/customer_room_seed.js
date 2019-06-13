
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('rooms').del(),

    // Inserts seed entries
    knex('rooms').insert({roomtype: 'Q', rent: 1000.00}),
    knex('rooms').insert({roomtype: 'Q', rent: 1000.00}),
    knex('rooms').insert({roomtype: 'K', rent: 2000.00}),

    knex('customers').del(),
    
    knex('customers').insert({username:'ram.prasad', firstname: 'ram', lastname:'prasad', dob: '08/03/1987', email:'ram.prasad@gmail.com', password: 'kuch001', status:1, phone:9176190000})
  );
};
