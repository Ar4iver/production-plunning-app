export interface Machine {
	id: string
	name: string
}

export interface MachinesState {
	data: Machine[]
	isLoading: boolean
	error: string | null
}
