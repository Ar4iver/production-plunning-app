import { Plan } from 'features/productionPlanning/plans/model/types/plans'

export interface Machine {
	id: string
	machineName: string
	plans: any[]
}

export interface MachinesState {
	data: Machine[]
	isLoading: boolean
	error: string | null
}
