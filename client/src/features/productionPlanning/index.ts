import { shiftsReducer } from './shifts/model/slice/shiftsSlice'
import { ordersReducer } from './orders/model/slice/ordersSlice'
import { plansReducer } from './plans/model/slice/plansSlice'
import { AddPlanForm } from './plans/ui/AddPlanForm/AddPlanForm'
import { PlansState } from './plans/model/types/plans'
import { OrdersState } from './orders/model/types/orders'
import { ShiftsState } from './shifts/model/types/shifts'

//редьюсеры
export { shiftsReducer, ordersReducer, plansReducer }

//корневые типы
export { PlansState, OrdersState, ShiftsState }

//фича
export { AddPlanForm }
