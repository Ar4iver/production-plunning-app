const db = require('./db.json') // Подключаем файл базы данных json

module.exports = function () {
	return {
		// Обработчик маршрута для добавления нового плана
		addPlan: (req, res) => {
			const {
				detailName,
				quantity,
				deadline,
				productivity,
				shiftsPerDay,
				equipment,
			} = req.body // Получаем данные плана из тела запроса

			// Генерируем уникальный идентификатор для нового плана
			const newPlanId = db.plans.length + 1

			// Создаем новый план
			const newPlan = {
				id: newPlanId.toString(),
				detailName,
				quantity,
				startDate: new Date(),
				deadline,
				productivity,
				shiftsPerDay,
				equipment,
			}

			// Добавляем новый план в базу данных
			db.plans.push(newPlan)

			// Сохраняем изменения в файле базы данных
			fs.writeFileSync('./json-server/db.json', JSON.stringify(db))

			// Отправляем ответ с созданным планом и статусом 201 Created
			res.status(201).json(newPlan)
		},
	}
}
