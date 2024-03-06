import { shiftsReducer } from './shifts/model/slice/shiftsSlice'
import { ordersReducer } from './orders/model/slice/ordersSlice'
import { plansReducer } from './plans/model/slice/plansSlice'
import { AddPlanForm } from './plans/ui/AddPlanForm/AddPlanForm'
import { PlansState, StageState } from './plans/model/types/plans'
import { OrdersState } from './orders/model/types/orders'
import { ShiftsState } from './shifts/model/types/shifts'
import { ShiftCell } from './shifts/ui/ShiftCell/ShiftCell'
import { machinesReducer } from './machines'
import { detailsReducer } from './details'
import { AddMachinesForm } from './machines/ui/machinesForm/AddMachinesForm'

//редьюсеры
export {
	shiftsReducer,
	ordersReducer,
	plansReducer,
	machinesReducer,
	detailsReducer,
}

//корневые типы
export { PlansState, OrdersState, ShiftsState, StageState }

//фича
export { AddPlanForm, ShiftCell, AddMachinesForm }
