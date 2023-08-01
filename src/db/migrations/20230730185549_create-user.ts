import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id', 40).primary().notNullable()
    table.string('email', 40).unique().notNullable()
    table.string('name', 40).notNullable()
    table.string('password').notNullable()
    table.string('image').notNullable()
    table.text('threads_url')
    table.text('twitter_url')
    table.text('tiktok_url')
    table.text('instagram_url')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.dateTime('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
