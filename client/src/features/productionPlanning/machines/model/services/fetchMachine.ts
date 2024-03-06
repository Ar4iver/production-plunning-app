import { createAsyncThunk } from '@reduxjs/toolkit'
import { Machine } from '../types/machines'
import { ThunkConfig } from 'app/providers/StoreProvider'

export const fetchMachineData = createAsyncThunk<
	Machine[],
	void,
	ThunkConfig<string>
>('machine/fetchMachine', async (_, thunkAPI) => {
	const { extra, rejectWithValue } = thunkAPI
	try {
		const response = await extra.api.get<Machine[]>('/machine')
		if (!response.data) {
			throw new Error('No data')
		}
		return response.data
	} catch (e) {
		console.log(e)
		return rejectWithValue('error')
	}
})
