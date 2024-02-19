import { createAsyncThunk } from '@reduxjs/toolkit'

export const addPlan = createAsyncThunk(
	'plans/addPlan',
	async (planData, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:8000/plans', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(planData),
			})

			if (!response.ok) {
				throw new Error('Не удалось добавить план')
			}

			const data = await response.json()
			return data
		} catch (e) {
			return rejectWithValue('error')
		}
	}
)
