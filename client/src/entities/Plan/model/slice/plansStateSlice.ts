import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Plan, PlansState } from '../types/plan'
import axios from 'axios'

const initialState: PlansState = {
	plans: [],
	isLoading: null,
	error: null,
}

export const addPlanAsync = createAsyncThunk(
	'plans/add',
	async (planData: Plan, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:8000/plans',
				planData
			)
			return response.data
		} catch (error) {
			return rejectWithValue(error.response.data)
		}
	}
)

const plansSlice = createSlice({
	name: 'plans',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(addPlanAsync.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(addPlanAsync.fulfilled, (state, action) => {
				state.plans.push(action.payload) // Добавляем новый план в массив планов
				state.isLoading = false
			})
			.addCase(addPlanAsync.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string // Обновляем состояние ошибки
			})
	},
})

export const { actions: plansSliceActions } = plansSlice
export const { reducer: plansSliceReducer } = plansSlice
