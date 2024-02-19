import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ShiftsState } from '../types/shifts'

const initialState: ShiftsState = {
	shifts: [],
	isLoading: false,
	error: null,
}

const shiftsSlice = createSlice({
	name: 'shifts',
	initialState,
	reducers: {},
})

export const { actions: shiftsActions, reducer: shiftsReducer } = shiftsSlice
