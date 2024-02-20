export interface ShiftsState {
	data: Shift[]
	isLoading: boolean
	error: string | null
}

export interface MachineInShift {
	machineId: string // идентификатор станка
	productivity: number // Производительность станка в единицу времени
	detailType: string // Тип изготавливаемой детали
	quantity: number // Количество деталей, которое будет производить этот станок в смену
}

export interface Shift {
	id: string // идентификатор смены
	planId?: string //идентификатор плана
	startTime?: string //начало смены
	endTime: string //конец смены
	machines: MachineInShift[] // станки, которые работают в смене.
}
