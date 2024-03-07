// type Shift = 'A' | 'B' | 'C' // Определяем тип для смен

// interface PlanItem {
// 	date: string
// 	shift: Shift
// 	quantity: number
// }

// export function generatePlan(
// 	startDate: string,
// 	detailName: string, // Этот параметр в дальнейшем можно использовать для более сложной логики
// 	stageName: string, // Аналогично, используется в расширенной логике
// 	stageDuration: number,
// 	totalQuantity: number,
// 	shiftEfficiency: number,
// 	shifts: Shift[]
// ): PlanItem[] {
// 	const shiftDuration = 460
// 	const effectiveDuration = shiftDuration * shiftEfficiency
// 	const perShiftQuantity = Math.floor(effectiveDuration / stageDuration)
// 	let requiredShifts = Math.ceil(totalQuantity / perShiftQuantity)

// 	const plan: PlanItem[] = []
// 	let currentDate = new Date(startDate)
// 	let shiftIndex = 0

// 	while (requiredShifts > 0) {
// 		if (shiftIndex >= shifts.length) {
// 			shiftIndex = 0
// 			currentDate.setDate(currentDate.getDate() + 1) // Переходим к следующему дню
// 		}

// 		plan.push({
// 			date: currentDate.toISOString().split('T')[0],
// 			shift: shifts[shiftIndex],
// 			quantity:
// 				perShiftQuantity > totalQuantity
// 					? totalQuantity
// 					: perShiftQuantity,
// 		})

// 		totalQuantity -= perShiftQuantity
// 		requiredShifts--
// 		shiftIndex++
// 	}

// 	return plan
// }

type Shift = 'A' | 'B' | 'C'

interface ShiftPlan {
	date: string
	shift: Shift
	quantity: number
}

interface DailyPlan {
	[date: string]: ShiftPlan[]
}

interface ProductionPlan {
	id: string
	startDate: string
	plan: DailyPlan
}

function generateUniqueId(): string {
	return Math.random().toString(36).substr(2, 9)
}

export function generatePlan(
	startDate: string,
	detailName: string, // Параметр для будущего использования
	stageName: string, // Параметр для будущего использования
	stageDuration: number,
	totalQuantity: number,
	shiftEfficiency: number,
	shifts: Shift[]
): ProductionPlan {
	const shiftDuration = 460
	const effectiveDuration = shiftDuration * shiftEfficiency
	const perShiftQuantity = Math.floor(effectiveDuration / stageDuration)
	let requiredShifts = Math.ceil(totalQuantity / perShiftQuantity)

	const dailyPlan: DailyPlan = {}
	let currentDate = new Date(startDate)
	let shiftIndex = 0

	while (requiredShifts > 0) {
		const dateKey = currentDate.toISOString().split('T')[0]
		if (!dailyPlan[dateKey]) {
			dailyPlan[dateKey] = []
		}

		const shiftPlan: ShiftPlan = {
			date: dateKey,
			shift: shifts[shiftIndex],
			quantity:
				perShiftQuantity > totalQuantity
					? totalQuantity
					: perShiftQuantity,
		}

		dailyPlan[dateKey].push(shiftPlan)

		totalQuantity -= perShiftQuantity
		requiredShifts--
		shiftIndex = (shiftIndex + 1) % shifts.length
		if (shiftIndex === 0) {
			currentDate.setDate(currentDate.getDate() + 1)
		}
	}

	return {
		id: generateUniqueId(),
		startDate: startDate,
		plan: dailyPlan,
	}
}
