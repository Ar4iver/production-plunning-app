const db = require('./db.json')
module.exports = function () {
	return {
		addPlan: (req, res) => {
			const {
				detailName,
				stage,
				machine,
				parts,
				productivity,
				shifts,
				startDate,
			} = req.body

			const newPlanId = db.plans.length + 1

			const newPlan = {
				id: newPlanId.toString(),
				detailName,
				stage,
				machine,
				parts: parseInt(parts, 10),
				productivity: parseInt(productivity, 10),
				shifts: parseInt(shifts, 10),
				startDate,
			}

			db.plans.push(newPlan)

			fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8')

			db = require('./db.json')

			res.status(201).json(newPlan)
		},
	}
}
