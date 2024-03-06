import { StateSchema } from 'app/providers/StoreProvider'

export const getIsErrorData = (state: StateSchema) => state.details.error
