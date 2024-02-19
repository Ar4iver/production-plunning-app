import { StateSchema } from 'app/providers/StoreProvider'
import { DetailsState } from '../types/details'

// export const getAllDetailsNames = (state: StateSchema) => state.details.details

export const getDetails = (state: StateSchema) => state.details.details
