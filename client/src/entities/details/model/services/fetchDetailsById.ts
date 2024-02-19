import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { Details } from '../types/details'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const fetchDetailsById = createAsyncThunk<
	Details,
	string,
	ThunkConfig<string>
>('details/fetchDetailById', async (detailId, thunkAPI) => {
	const { extra, rejectWithValue } = thunkAPI
	try {
		const response = await extra.api.get<Details>(`/details/${detailId}`)
		if (!response.data) {
			throw new Error('No data')
		}
		return response.data
	} catch (e) {
		console.log(e)
		return rejectWithValue('error')
	}
})
