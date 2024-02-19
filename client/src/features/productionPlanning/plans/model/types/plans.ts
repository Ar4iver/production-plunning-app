import { Machine } from 'entities/machines/model/types/machines'
import { Shift } from 'features/productionPlanning/shifts/model/types/shifts'

export interface Stage {
	id: string
	nameStage: string
	timeStage: number
}

export interface Plan {
	id: string
	detailInfo: {
		id: string
		detailName: string
	}
	stage: Stage
	machine: Machine
	parts: number
	productivity: number
	shifts: Shift
	startDate: string
}

export interface PlansState {
	plans: Plan[]
	isLoading: boolean
	error: string | null
}
