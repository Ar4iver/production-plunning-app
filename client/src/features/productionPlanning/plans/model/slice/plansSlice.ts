import { createSlice } from '@reduxjs/toolkit'
import { PlansState } from '../types/plans'

const initialState: PlansState = {
	data: [],
	isLoading: false,
	error: null,
}

const plansSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {},
})

export const { actions: plansActions, reducer: plansReducer } = plansSlice
