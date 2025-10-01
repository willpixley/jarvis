// Update with your config settings.
require('dotenv').config();
const path = require('path');
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
	development: {
		client: 'pg',
		connection: {
			host: 'postgres',
			user: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			port: 5432,
		},
		migrations: {
			directory: path.resolve('./migrations'),
		},
	},
};
