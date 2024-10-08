/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { first_name: 'John', last_name: 'Smith', username: 'johns', password: 'secret', auth_token: '' },
    { first_name: 'Jane', last_name: 'Doe', username: 'janed', password: 'secret', auth_token: '' },
    { first_name: 'Will', last_name: 'Smith', username: 'wills', password: 'secret',auth_token: '' },
    { first_name: 'Angelina', last_name: 'Jollie', username: 'Angelinaj', password: 'secret',auth_token: '' },
    { first_name: 'Joe', last_name: 'Biden', username: 'joeb', password: 'secret',auth_token: '' }
  ]);
};
