import { db } from '../lib/vars.js';

export async function getMeasurements(req, res) {
	try {
		const environment = await db('environment_readings')
			.orderBy('measurement_time', 'desc')
			.first(); // gets the first result after ordering

		const plants = await db('plant_readings as pr')
			.join(
				db('plant_readings')
					.select('plant_id')
					.max('measurement_time as measurement_time')
					.groupBy('plant_id')
					.as('latest'),
				function () {
					this.on('pr.plant_id', '=', 'latest.plant_id').andOn(
						'pr.measurement_time',
						'=',
						'latest.measurement_time'
					);
				}
			)
			.join('plants as p', 'pr.plant_id', 'p.id') // join plants table
			.select('pr.*', 'p.*'); // select all columns from both tables

		if (!environment || !plants) {
			return res.status(404).json({ error: 'No data found' });
		}

		res.json({
			environment,
			plants,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
}
