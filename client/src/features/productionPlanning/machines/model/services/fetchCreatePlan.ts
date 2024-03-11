import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from 'app/providers/StoreProvider'
import { Plan } from 'features/productionPlanning/plans/model/types/plans'

interface CreatePlanProps {
	machineId: string | number
	startDate: string
	detailName: string
	stage: {
		nameStage: string
		duration: number
	}
	totalQuantity: number
	shiftEfficiency: number
	shifts: string[]
}

export const fetchCreatePlan = createAsyncThunk<
	Plan,
	CreatePlanProps,
	ThunkConfig<string>
>('plans/fetchCreatePlan', async ({ machineId, ...formData }, thunkApi) => {
	const { extra, dispatch, rejectWithValue } = thunkApi

	try {
		const response = await extra.api.post<Plan>(
			`/machine/${machineId}/plan`,
			formData
		)

		if (!response.data) {
			throw new Error()
		}

		return response.data
	} catch (e) {
		console.log(e)
		return rejectWithValue('error')
	}
})
