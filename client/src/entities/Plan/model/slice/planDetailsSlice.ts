import { createSlice } from '@reduxjs/toolkit'
import { PlanDetailsSchema } from '../types/planDetailsSchema'

const initialState: PlanDetailsSchema = {
	isLoading: false,
	error: undefined,
	data: undefined,
}

export const planDetailsSlice = createSlice({
	name: 'planDetails',
	initialState,
	reducers: {},
})

export const { actions: planDetailsSliceActions } = planDetailsSlice
export const { reducer: planDetailsSliceReducer } = planDetailsSlice
