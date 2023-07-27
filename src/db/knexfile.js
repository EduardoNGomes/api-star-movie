// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'filmfansexplorer',
      user:     'film',
      password: 'AlGFYwhhzrimxUGUr15ZvA8MomR2XipN',
      host: 'dpg-cj0rcf5ph6enmk60r9l0-a'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './migrations',
    }
  }

};
