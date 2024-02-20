export interface Details {
	id: string
	nameDetail: string
	stages: []
}

export interface DetailsState {
	data: Details[]
	isLoading: boolean
	error: string | null
	currentDetail: Details | null
}
