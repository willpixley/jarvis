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

export async function getHistoricalMeasurements(req, res) {
	// unit should be min, hr, day, mo
	// interval is defined as measurement every INTERVAL iUnit
	// from qUnits ago taken every interval iUnit
	// from: 3, qUnit: mo, interval: 1, iUnit: day
	// means 1 measurement daily from the past 3 months

	const { from = 1, qUnit = 'mo', interval = 1, iUnit = 'day' } = req.query;

	const unitMap = {
		min: 'minute',
		hr: 'hour',
		day: 'day',
		mo: 'month',
	};

	const lookback = `${from} ${unitMap[qUnit] || qUnit}`;
	const step = `${interval} ${unitMap[iUnit] || iUnit}`;

	try {
		// Step 1 — generate time buckets
		const timeBuckets = await db
			.with('time_buckets', (qb) => {
				qb.select(
					db.raw(
						`generate_series(
							now() - interval '${lookback}',
							now(),
							interval '${step}'
						) as bucket`
					)
				);
			})
			.select('*')
			.from('time_buckets');

		// Step 2 — Environment readings per bucket
		const environment = await db
			.with('time_buckets', (qb) => {
				qb.select(
					db.raw(
						`generate_series(
							now() - interval '${lookback}',
							now(),
							interval '${step}'
						) as bucket`
					)
				);
			})
			.select(
				't.bucket',
				db.raw('avg(er.temperature) as temperature'),
				db.raw('avg(er.humidity) as humidity'),
				db.raw('avg(er.lux) as lux')
			)
			.from('time_buckets as t')
			.leftJoin('environment_readings as er', function () {
				this.on('er.measurement_time', '>=', db.raw('t.bucket')).andOn(
					'er.measurement_time',
					'<',
					db.raw(`t.bucket + interval '${step}'`)
				);
			})
			.groupBy('t.bucket')
			.orderBy('t.bucket');

		// Step 3 — Plant readings per bucket
		const plants = await db
			.with('time_buckets', (qb) => {
				qb.select(
					db.raw(
						`generate_series(
							now() - interval '${lookback}',
							now(),
							interval '${step}'
						) as bucket`
					)
				);
			})
			.select(
				't.bucket',
				'pr.plant_id',
				'p.name',
				db.raw('avg(pr.soil_moisture) as soil_moisture')
			)
			.from('time_buckets as t')
			.leftJoin('plant_readings as pr', function () {
				this.on('pr.measurement_time', '>=', db.raw('t.bucket')).andOn(
					'pr.measurement_time',
					'<',
					db.raw(`t.bucket + interval '${step}'`)
				);
			})
			.leftJoin('plants as p', 'pr.plant_id', 'p.id')
			.groupBy('t.bucket', 'pr.plant_id', 'p.name')
			.orderBy('t.bucket');

		res.json({ environment, plants });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
}
