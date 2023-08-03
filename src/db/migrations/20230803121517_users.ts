import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.string('id', 40).primary()
    table.string('email', 40).unique().notNullable()
    table.string('name', 40).notNullable()
    table.string('password').notNullable()
    table.string('image')
    table.string('threads_url')
    table.string('twitter_url')
    table.string('tiktok_url')
    table.string('instagram_url')
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
}
