exports.up = async function (knex) {
	await knex.schema.createTable('plants', (table) => {
		table.increments('id').primary();
		table.string('name').notNullable();
	});

	await knex.schema.createTable('plant_readings', (table) => {
		table.increments('id').primary();
		table.decimal('soil_moisture', 5, 2);
		table
			.integer('plant_id')
			.references('id')
			.inTable('plants')
			.onDelete('CASCADE')
			.notNullable();
		table.timestamp('measurement_time').defaultTo(knex.fn.now());
	});
	await knex.schema.createTable('environment_readings', (table) => {
		table.increments('id').primary();
		table.decimal('temperature', 5, 2);
		table.decimal('humidity', 5, 2);
		table.decimal('lux', 10, 2);
		table.timestamp('measurement_time').defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {};
