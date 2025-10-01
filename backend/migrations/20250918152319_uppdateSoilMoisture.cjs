/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function (knex) {
	await knex.schema.alterTable('plant_readings', (table) => {
		table.decimal('soil_moisture', 10, 2).alter();
	});
};

/**
 * @param {import("knex").Knex} knex
 */
exports.down = async function (knex) {
	await knex.schema.alterTable('plant_readings', (table) => {
		table.decimal('soil_moisture', 5, 2).alter();
	});
};
