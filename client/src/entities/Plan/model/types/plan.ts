export interface Plan {
	id: string // Уникальный идентификатор плана
	detailName: string // Название детали
	quantity: number | string // Количество деталей, которое нужно выполнить
	startDate: Date // Дата начала выполнения плана
	stage: string
	endDate?: Date // Опциональный срок выполнения плана
	productivity: number | string // Производительность (в процентах)
	shiftsPerDay: number | string // Количество смен в день
	equipment: string // Название оборудования (например, станка)
}

export interface PlansState {
	plans: Plan[]
	isLoading: boolean | null
	error: string | null
}
