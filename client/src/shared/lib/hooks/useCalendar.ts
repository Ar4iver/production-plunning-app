import { useState } from 'react'
import {
	startOfWeek,
	endOfWeek,
	addWeeks,
	subWeeks,
	eachDayOfInterval,
	format,
} from 'date-fns'

export const useCalendar = () => {
	const [currentWeek, setCurrentWeek] = useState<Date>(
		startOfWeek(new Date(), { weekStartsOn: 1 })
	)

	const startDay = startOfWeek(currentWeek, { weekStartsOn: 1 })
	const endDay = endOfWeek(currentWeek, { weekStartsOn: 1 })

	const nextWeek = () => {
		setCurrentWeek((current) => addWeeks(current, 1))
	}

	const prevWeek = () => {
		setCurrentWeek((current) => subWeeks(current, 1))
	}

	const days = eachDayOfInterval({ start: startDay, end: endDay })

	const weekDates = days.map((day) => format(day, 'yyyy-MM-dd'))

	return { currentWeek, days, nextWeek, prevWeek, weekDates }
}
