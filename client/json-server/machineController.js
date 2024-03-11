const db = require('./db.json')
const path = require('path')
const fs = require('fs')
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

		addMachinePlan: (req, res) => {
			const machineId = req.params.id // Получаем ID машины из параметров URL
			const plan = req.body // Получаем план из тела запроса

			// Загружаем текущее состояние базы данных
			const dbPath = path.join(__dirname, 'db.json')
			const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'))

			// Находим машину по ID
			const machineIndex = dbData.machine.findIndex(
				(m) => m.id.toString() === machineId
			)
			if (machineIndex !== -1) {
				// Если машина найдена, добавляем план в массив планов
				dbData.machine[machineIndex].plans.push(plan)

				// Сохраняем обновленные данные в db.json
				fs.writeFileSync(
					dbPath,
					JSON.stringify(dbData, null, 2),
					'utf-8'
				)

				res.status(201).json({
					message: 'План успешно добавлен к машине',
					machine: dbData.machine[machineIndex],
				})
			} else {
				res.status(404).send({ message: 'Машина не найдена' })
			}
		},
	}
}
