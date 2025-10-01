import knex from 'knex';
import knexConfig from '../knexfile.cjs';
import axios from 'axios';
const db = knex(knexConfig.development);

export async function fetchAndStoreMeasurements() {
	console.log('Getting plant measurements');
	try {
		const response = await axios.get('http://104.166.253.189/api', {
			timeout: 5000, // 5 seconds
		});
		const data = response.data;
		console.log('API reponse', data);
		const plants = data.plants;
		const environment = data.environment;
		await db('environment_readings').insert({
			temperature: environment.temperature,
			humidity: environment.humidity,
			lux: environment.lightLevel,
			measurement_time: db.fn.now(),
		});

		for (const { name, soilMoisture } of plants) {
			try {
				const plant = await db('plants').where({ name }).first();
				if (!plant) {
					console.log('no plant found with name', name);
					continue;
				}
				await db('plant_readings').insert({
					soil_moisture: soilMoisture,
					plant_id: plant.id,
					measurement_time: db.fn.now(),
				});
				console.log('Reading inserted for', name);
			} catch (e) {
				console.error('ERROR INSERTING READING: ', e);
			}
		}

		console.log('Data saved at', new Date().toISOString());
	} catch (err) {
		console.error('Error fetching data:', err);
	}
}
