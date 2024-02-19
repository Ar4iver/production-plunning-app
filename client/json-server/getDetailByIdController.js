const fs = require('fs')
let db = require('./db.json')

module.exports = function () {
	return {
		getDetailById: (req, res) => {
			const { id } = req.params

			const detail = db.details.find((detail) => detail.id === id)

			if (detail) {
				res.status(200).json(detail)
			} else {
				res.status(404).send('Detail not found')
			}
		},
	}
}
