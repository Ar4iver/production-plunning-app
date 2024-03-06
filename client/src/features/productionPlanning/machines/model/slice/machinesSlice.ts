import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Machine, MachinesState } from '../types/machines'
import { fetchMachineData } from '../services/fetchMachine'

const initialState: MachinesState = {
	data: [],
	isLoading: false,
	error: null,
}

const machinesSlice = createSlice({
	name: 'machines',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMachineData.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchMachineData.fulfilled,
				(state, action: PayloadAction<Machine[]>) => {
					state.isLoading = false
					state.data = action.payload
				}
			)
			.addCase(fetchMachineData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { actions: machinesActions, reducer: machinesReducer } =
	machinesSlice
