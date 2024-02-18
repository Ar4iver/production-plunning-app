import { StateSchema } from 'app/providers/StoreProvider'
import { DetailsState } from '../types/details'

export const getIsLoading = (state: StateSchema) => state.details.isLoading
