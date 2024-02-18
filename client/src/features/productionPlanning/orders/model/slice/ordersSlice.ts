import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { OrdersState } from '../types/orders'

const initialState: OrdersState = {
	orders: [],
	isLoading: false,
	error: null,
}

const ordersSlice = createSlice({
	name: 'orders',
	initialState,
	reducers: {},
})

export const { actions: ordersActions, reducer: ordersReducer } = ordersSlice
