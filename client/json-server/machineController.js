const db = require('./db.json')
module.exports = function () {
	return {
		addMachine: (req, res) => {
			const { machineName } = req.body

			const newMachineId = db.machine.length + 1

			const newMachine = {
				id: newMachineId.toString(),
				machineName,
			}

			db.machine.push(newMachine)

			fs.writeFileSync('./db.json', JSON.stringify(db, null, 2), 'utf-8')

			db = require('./db.json')

			res.status(201).json(newMachine, 'Успешно добавлен')
		},
	}
}
