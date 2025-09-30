/**
 * @param {import("knex").Knex} knex
 */
exports.up = async function (knex) {
	await knex('plants').insert([
		{ name: 'Dracaena Fragrans' },
		{ name: 'Moonlight Pilea' },
	]);
};
exports.down = function (knex) {};
