import axios from 'axios'

// const baseURL = __IS_DEV__ ? 'http://localhost:8000' : 'https://production.ru'

export const $api = axios.create({
	baseURL: __API__,
})
