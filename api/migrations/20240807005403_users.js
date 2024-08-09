/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments('id').primary();
        table.string('first_name', 250);
        table.string('last_name', 250);
        table.string('username', 250).unique().notNullable();
        table.string('password', 2500).notNullable();
        table.string('auth_token', 400);
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};
