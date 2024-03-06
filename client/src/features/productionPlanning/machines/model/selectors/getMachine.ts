import { StateSchema } from 'app/providers/StoreProvider'

export const getMachine = (state: StateSchema) => state.machines.data
