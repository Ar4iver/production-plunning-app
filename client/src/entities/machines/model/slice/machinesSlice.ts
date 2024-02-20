import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { MachinesState } from '../types/machines'

const initialState: MachinesState = {
	data: [],
	isLoading: false,
	error: null,
}

const machinesSlice = createSlice({
	name: 'machines',
	initialState,
	reducers: {},
})

export const { actions: machinesActions, reducer: machinesReducer } =
	machinesSlice
