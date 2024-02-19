import {
	Dispatch,
	EnhancedStore,
	PayloadAction,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { DetailsState } from 'entities/details'
import { MachinesState } from 'entities/machines'
import {
	OrdersState,
	PlansState,
	ShiftsState,
} from 'features/productionPlanning'

export interface StateSchema {
	plans: PlansState
	orders: OrdersState
	shifts: ShiftsState
	machines: MachinesState
	details: DetailsState
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: PayloadAction) => StateSchema
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}

export interface ThunkExtraArg {
	api: AxiosInstance
}

export interface ThunkConfig<T> {
	rejectValue: T
	extra: ThunkExtraArg
}
