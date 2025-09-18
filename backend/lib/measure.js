import knex from 'knex';
import knexConfig from '../knexfile.cjs';

const db = knex(knexConfig.development);

async function fetchAndStoreData() {
	try {
		const response = await axios.get('http://192.168.4.146/api');
		const data = response.data;

		await db('my_table').insert({
			value: json.someField,
			created_at: new Date(),
		});

		console.log('Data saved at', new Date().toISOString());
	} catch (err) {
		console.error('Error fetching data:', err);
	}
}
