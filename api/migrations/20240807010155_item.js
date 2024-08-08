/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("item", (table) => {
        table.increments('id').primary();
        table.string('item_name', 25);
        table.string('item_description', 200);
        table.integer('quantity');
        table.integer('user_id').unsigned().references('id').inTable('users');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('item');
};
