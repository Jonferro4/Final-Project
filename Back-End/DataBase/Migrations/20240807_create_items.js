exports.up = function(knex) {
    return knex.schema.createTable('items', table => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.string('name').notNullable();
      table.text('description');
      table.integer('quantity').notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('items');
  };