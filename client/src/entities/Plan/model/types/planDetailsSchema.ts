import { Plan } from './plan'

export interface PlanDetailsSchema {
	isLoading: boolean
	error?: string
	data?: Plan
}
