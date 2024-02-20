import { createSlice } from '@reduxjs/toolkit'
import { PlansState } from '../types/plans'
import { fetchCreatePlan } from '../services/fetchCreatePlan'

const initialState: PlansState = {
	data: [],
	isLoading: false,
	error: null,
}

const plansSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCreatePlan.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(fetchCreatePlan.fulfilled, (state, action) => {
				state.isLoading = false
				state.data.push(action.payload)
			})
			.addCase(fetchCreatePlan.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { actions: plansActions, reducer: plansReducer } = plansSlice
