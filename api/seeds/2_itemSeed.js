/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    { item_name: 'Ring Light', item_description: 'The United States Department of Housing', quantity: 19},
    { item_name: 'Cup', item_description: 'Urban Development distinguishes between "price analysis"', quantity: 14},
    { item_name: 'Pouch', item_description: 'The United States Department of Housing', quantity: 8},
    { item_name: 'Monitor', item_description: 'The United States Department of Housing', quantity: 21},
    { item_name: 'Cell Phone', item_description: 'The United States Department of Housing', quantity: 10}
  ]);
};
