interface ShiftPlan {
	shift: string // Название смены, например "A", "B"
	quantity: number // Планируемое количество работы для смены
	efficiency: number // Производительность смены в процентах
	fact: null | number
}

interface DailyPlan {
	date: string // Дата дня
	plans: ShiftPlan[] // Планы для каждой смены в этот день
}

interface Plan {
	startDate: string
	detailName: string
	stage: {
		nameStage: string
		duration: number
	}
	totalQuantity: number
	shiftEfficiency: number
	shifts: string[]
	dailyPlans: DailyPlan[]
}

export function generatePlan(
	startDate: string,
	detailName: string,
	stageName: string,
	stageDuration: number,
	totalQuantity: number,
	shiftEfficiency: number,
	shifts: string[]
): Plan {
	const shiftDuration = 460
	const effectiveDuration = shiftDuration * shiftEfficiency // время с учётом производительности
	const perShiftQuantity = Math.floor(effectiveDuration / stageDuration) // Количество заготовок на смену
	let requiredShifts = Math.ceil(totalQuantity / perShiftQuantity) // Общее количество требуемых смен на выполнение плана

	let dailyPlans: DailyPlan[] = []
	let currentDate = new Date(startDate)
	let remainingQuantity = totalQuantity

	while (requiredShifts > 0) {
		for (let shift of shifts) {
			if (remainingQuantity <= 0) break

			let quantityForShift = Math.min(perShiftQuantity, remainingQuantity)
			let dateKey = currentDate.toISOString().split('T')[0]
			let foundDay = dailyPlans.find((day) => day.date === dateKey)

			if (!foundDay) {
				foundDay = { date: dateKey, plans: [] }
				dailyPlans.push(foundDay)
			}

			foundDay.plans.push({
				shift: shift,
				quantity: quantityForShift,
				efficiency: shiftEfficiency * 100, // Производительность смены в процентах
				fact: null,
			})

			remainingQuantity -= quantityForShift
			requiredShifts--
		}
		currentDate.setDate(currentDate.getDate() + 1) // Переходим к следующему дню
	}

	return {
		startDate: startDate,
		detailName: detailName,
		stage: { nameStage: stageName, duration: stageDuration },
		totalQuantity: totalQuantity,
		shiftEfficiency: shiftEfficiency,
		shifts: shifts,
		dailyPlans: dailyPlans,
	}
}
