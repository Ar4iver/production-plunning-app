export type Shift = 'A' | 'B' | 'C'

export type ShiftPlan = {
	shift: Shift
	plan: number
	fact: number | null
}

export type Equipment = {
	name: string
	days: DayPlan[]
}

export type DayPlan = {
	date: string
	shiftPlans: ShiftPlan[]
}
