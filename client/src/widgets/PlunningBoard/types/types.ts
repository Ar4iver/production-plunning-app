import { StageState } from 'features/productionPlanning'
import { Details } from 'features/productionPlanning/details'

export type Shift = 'A' | 'B' | 'C'

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

export interface ShiftPlan {
	shift: string
	quantity: number
	efficiency: number
}

export interface DailyPlan {
	date: string
	plans: ShiftPlan[]
}

interface Plan {
	startDate: string
	detailName: string
	stage: {
		nameStage: string
		duration: number
	}
	totalQuantity: number
	shiftEfficiency: number
	shifts: string[]
	dailyPlans: DailyPlan[]
}
