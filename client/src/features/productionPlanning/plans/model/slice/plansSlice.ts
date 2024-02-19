import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlansState } from '../types/plans'
import { addPlan } from '../services/createPlan'

const initialState: PlansState = {
	plans: [],
	isLoading: false,
	error: null,
}

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
