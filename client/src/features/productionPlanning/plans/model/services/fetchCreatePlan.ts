import { createAsyncThunk } from '@reduxjs/toolkit'
import { Plan } from '../types/plans'
import { ThunkConfig } from 'app/providers/StoreProvider'

interface CreatePlanProps {
	id: string
	detailInfo: {
		id: string
		detailName: string
	}
	stage: {
		id: string
		nameStage: string
		timeStage: number
	}
	machine: {
		id: string
		machineName: string
	}
	parts: number
	productivity: number
	shifts: number
	startDate: string
}

export const fetchCreatePlan = createAsyncThunk<
	Plan,
	CreatePlanProps,
	ThunkConfig<string>
>('plans/fetchCreatePlan', async (formData, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi

	try {
		const response = await extra.api.post<Plan>('/plans', formData)

		if (!response.data) {
			throw new Error()
		}

		return response.data
	} catch (e) {
		console.log(e)
		return rejectWithValue('error')
	}
})
