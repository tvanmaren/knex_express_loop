
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('artists', (table) => {
      table.increments();
      table.string('name');
      table.timestamps(true, true);
      table.string('profile_url');
    }),
    knex.schema.createTable('tracks', (table) => {
    table.increments();
    table.integer('artist_id')
      .notNullable()
      .references('id')
      .inTable('artists')
      .onDelete('CASCADE')
      .index();
    table.string('title').notNullable().defaultTo('');
    table.timestamps(true, true);
  })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('drop table if exists artists cascade'),
    knex.raw('drop table if exists tracks cascade'),
  ]);
};
