/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('filmes', function (table){
            table.string('id',40).primary();
            table.string('descr', 255);
            table.string('ano', 5);
            table.text('sinopse');
            table.text('imagem');
            table.timestamp('data_criacao').default(knex.fn.now())
            table.string('criado_por', 40);
            table.dateTime('data_atualizacao');
            table.string('alterado_por', 40);
            table.string('status', 2);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('filmes');
};
