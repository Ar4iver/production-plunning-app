const db = require('./db.json') // Путь к вашему файлу данных json-server

module.exports = function () {
	return {
		getAllDetails: (req, res) => {
			const details = db.details // Получаем детали из файла данных
			res.status(200).json(details) // Отправляем детали в ответе
		},
	}
}
