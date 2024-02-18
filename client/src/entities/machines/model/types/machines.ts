export interface Machine {
	id: string
	name: string
}

export interface MachinesState {
	machines: Machine[]
	isLoading: boolean
	error: string | null
}
