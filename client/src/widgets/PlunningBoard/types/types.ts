import { StageState } from 'features/productionPlanning'
import { Details } from 'features/productionPlanning/details'

export type Shift = 'A' | 'B' | 'C'

export interface ShiftPlan {
	id: string
	shiftInfo: {
		people: number | null
		productivity: number | null
	}
	shift: Shift
	plan: number | null
	fact: number | null
}

export interface MachinePlunning {
	id: string
	machineName: string
	plans: DayPlan[]
}

export interface DayPlan {
	date: string
	detailInfo: {
		product: Details
		stage: StageState
	}
	shiftPlans: ShiftPlan[]
}
