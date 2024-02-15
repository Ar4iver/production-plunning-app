export interface Plan {
	id: string // Уникальный идентификатор плана
	detailName: string // Название детали
	quantity: number // Количество деталей, которое нужно выполнить
	startDate: Date // Дата начала выполнения плана
	deadline?: Date // Опциональный срок выполнения плана
	productivity: number // Производительность (в процентах)
	shiftsPerDay: number // Количество смен в день
	equipment: string // Название оборудования (например, станка)
}

export interface PlansState {
	plans: Plan[]
}
