import {
	AnyAction,
	EnhancedStore,
	PayloadAction,
	Reducer,
	ReducersMapObject,
} from '@reduxjs/toolkit'
import { PlansState } from 'entities/Plan/model/types/plan'

export interface StateSchema {
	plansSlice: PlansState
}

export type StateSchemaKey = keyof StateSchema

export interface ReducerManager {
	getReducerMap: () => ReducersMapObject<StateSchema>
	reduce: (state: StateSchema, action: AnyAction) => StateSchema
	add: (key: StateSchemaKey, reducer: Reducer) => void
	remove: (key: StateSchemaKey) => void
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
	reducerManager: ReducerManager
}
