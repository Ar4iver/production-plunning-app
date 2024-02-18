export interface Plan {
	id: string
	startDate: string
	endDate: string
}

export interface PlansState {
	plans: Plan[]
	isLoading: boolean
	error: string | null
}
