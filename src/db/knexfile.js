// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: "postgres://film:AlGFYwhhzrimxUGUr15ZvA8MomR2XipN@dpg-cj0rcf5ph6enmk60r9l0-a.oregon-postgres.render.com/filmfansexplorer?ssl=true",
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
