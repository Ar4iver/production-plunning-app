export interface Machine {
	id: string
	machineName: string
	plans: []
}

export interface MachinesState {
	data: Machine[]
	isLoading: boolean
	error: string | null
}
