// import { createAsyncThunk } from '@reduxjs/toolkit'
// import { Plan } from '../types/plans'
// import { ThunkConfig } from 'app/providers/StoreProvider'

// interface CreatePlanProps {
// 	id: string
// 	startDate: string
// 	detailName: string
// 	stage: {
// 		nameStage: string
// 		duration: number
// 	}
// 	totalQuantity: number
// 	shiftEfficiency: number
// 	shifts: string[]
// }

// export const fetchCreatePlan = createAsyncThunk<
// 	Plan,
// 	CreatePlanProps,
// 	ThunkConfig<string>
// >('plans/fetchCreatePlan', async ({ id, ...formData }, thunkApi) => {
// 	const { extra, dispatch, rejectWithValue } = thunkApi

// 	try {
// 		const response = await extra.api.post<Plan>(
// 			`/machine/${id}/plans`,
// 			formData
// 		)

// 		if (!response.data) {
// 			throw new Error()
// 		}

// 		return response.data
// 	} catch (e) {
// 		console.log(e)
// 		return rejectWithValue('error')
// 	}
// })
