import Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('annotations', table => {
        table.increments('id').primary();
        table.string('uid').notNullable();
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        table.string('text').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('annotations');
}

