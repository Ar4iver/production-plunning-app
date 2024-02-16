import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './StateSchema'
import thunk from 'redux-thunk'
import { useDispatch } from 'react-redux'
import { createReducerManager } from './reducerManager'
import { plansSliceReducer } from 'entities/Plan'

export function createReduxStore(initialState?: StateSchema) {
	const rootReducers: ReducersMapObject<StateSchema> = {
		plansSlice: plansSliceReducer,
	}

	// const reducerManager = createReducerManager(rootReducers)

	const store = configureStore<StateSchema>({
		reducer: rootReducers,
		// middleware: [thunk],
		// devTools: __IS_DEV__,
		preloadedState: initialState,
	})

	//@ts-ignore
	// store.reducerManager = reducerManager

	return store
}

export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
