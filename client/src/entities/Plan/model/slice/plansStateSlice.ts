import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Plan, PlansState } from '../types/plan'

const initialState: PlansState = {
	plans: [],
}

const plansSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {
		addPlan(state, action: PayloadAction<Plan>) {
			state.plans.push(action.payload)
		},
	},
})

export const { actions: plansSliceActions } = plansSlice
export const { reducer: plansSliceReducer } = plansSlice
