import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('movies', (table) => {
    table.string('id', 40).primary()
    table.text('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.string('title', 40).unique()
    table.string('age', 5)
    table.text('sinopse')
    table.text('image')
    table.integer('rating').defaultTo(0)
    table.integer('comment_count').defaultTo(0)
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('movies')
}
