import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('comments', (table) => {
    table.string('id').primary().notNullable()
    table
      .string('movie_id')
      .references('id')
      .inTable('movies')
      .onDelete('CASCADE')
    table
      .string('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.integer('rating_movie').notNullable()
    table.string('description').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('comments')
}
