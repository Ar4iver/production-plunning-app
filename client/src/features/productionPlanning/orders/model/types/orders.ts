export interface Order {
	id: string
	shiftId: string
	detailType: string
	quantity: number
}

export interface OrdersState {
	orders: Order[]
	isLoading: boolean
	error: string | null
}
