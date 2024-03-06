import { StateSchema } from 'app/providers/StoreProvider'

export const getPlans = (state: StateSchema) => state.plans.data
