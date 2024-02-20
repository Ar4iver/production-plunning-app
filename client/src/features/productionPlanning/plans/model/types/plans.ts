import { Machine } from 'entities/machines/model/types/machines'
import { Shift } from 'features/productionPlanning/shifts/model/types/shifts'

export interface MachineStage {
	id: string
	machineName: string
}

export interface Stage {
	id: string
	nameStage: string
	machines: MachineStage[]
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
	data: Plan[]
	isLoading: boolean
	error: string | null
}
