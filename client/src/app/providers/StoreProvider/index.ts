import { createReduxStore } from './config/store'
import { StoreProvider } from './ui/StoreProvider'
import { AppDispatch } from './config/store'
import type {
	StateSchema,
	ReduxStoreWithManager,
	ThunkConfig,
} from './config/StateSchema'

export {
	StoreProvider,
	createReduxStore,
	StateSchema,
	ReduxStoreWithManager,
	ThunkConfig,
}
