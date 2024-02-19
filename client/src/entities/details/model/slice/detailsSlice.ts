import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Details, DetailsState } from '../types/details'
import { fetchDetailsData } from '../services/fetchDetails'
import { fetchDetailsById } from '../services/fetchDetailsById'

const initialState: DetailsState = {
	details: [],
	isLoading: false,
	error: null,
	currentDetail: null,
}

const detailsSlice = createSlice({
	name: 'details',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchDetailsData.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchDetailsData.fulfilled,
				(state, action: PayloadAction<Details[]>) => {
					state.isLoading = false
					state.details = action.payload
				}
			)
			.addCase(fetchDetailsData.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
			.addCase(fetchDetailsById.pending, (state) => {
				state.isLoading = true
				state.error = null
			})
			.addCase(
				fetchDetailsById.fulfilled,
				(state, action: PayloadAction<Details>) => {
					state.isLoading = false
					state.currentDetail = action.payload
				}
			)
			.addCase(fetchDetailsById.rejected, (state, action) => {
				state.isLoading = false
				state.error = action.payload as string
			})
	},
})

export const { actions: detailsActions, reducer: detailsReducer } = detailsSlice
