import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlansState } from '../types/plans'

const initialState: PlansState = {
	plans: [],
	isLoading: false,
	error: null,
}

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

const plansSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addPlan.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(addPlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.plans.push(action.payload)
			})
			.addCase(addPlan.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { actions: plansActions, reducer: plansReducer } = plansSlice
