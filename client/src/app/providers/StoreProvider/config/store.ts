import { Reducer, ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema, ThunkExtraArg } from './StateSchema'
import { useDispatch } from 'react-redux'
import {
	ordersReducer,
	plansReducer,
	shiftsReducer,
} from 'features/productionPlanning'
import { machinesReducer } from 'entities/machines'
import { detailsReducer } from 'entities/details'
import { $api } from 'shared/api/api'
import { createReducerManager } from './reducerManager'

export function createReduxStore(
	initialState?: StateSchema,
	asyncReducers?: ReducersMapObject<StateSchema>
) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		...asyncReducers,
		plans: plansReducer,
		machines: machinesReducer,
		orders: ordersReducer,
		shifts: shiftsReducer,
		details: detailsReducer,
	}

	const reducerManager = createReducerManager(rootReducers)

	const extraArg: ThunkExtraArg = {
		api: $api,
	}

	const store = configureStore({
		reducer: reducerManager.reduce as Reducer<StateSchema>,
		preloadedState: initialState,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: {
					extraArgument: extraArg,
				},
			}),
	})

	//@ts-ignore
	store.reducerManager = reducerManager

	return store
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
