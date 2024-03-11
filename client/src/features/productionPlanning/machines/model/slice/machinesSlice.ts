import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Machine, MachinesState } from '../types/machines'
import { fetchMachineData } from '../services/fetchMachine'
import { fetchCreatePlan } from '../services/fetchCreatePlan'
import { Plan } from 'features/productionPlanning/plans/model/types/plans'

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
			.addCase(fetchCreatePlan.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchCreatePlan.fulfilled,
				(state, action: PayloadAction<Plan>) => {
					const planData = action.payload
					const machineId = planData.id
					const machineIndex = state.data.findIndex(
						(machine) => machine.id === machineId
					)
					if (machineIndex !== -1) {
						state.data[machineIndex].plans.push(planData)
					}
					state.isLoading = false
				}
			)
			.addCase(fetchCreatePlan.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { actions: machinesActions, reducer: machinesReducer } =
	machinesSlice
