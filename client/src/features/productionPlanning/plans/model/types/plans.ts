import { Machine } from 'features/productionPlanning/machines'
import { Shift } from 'features/productionPlanning/shifts/model/types/shifts'

export interface MachineStage {
	id: string
	machineName: string
}

export interface StageState {
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
	stage: StageState
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
