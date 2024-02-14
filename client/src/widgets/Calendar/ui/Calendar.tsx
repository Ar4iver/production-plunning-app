import React, { useContext, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Calendar.module.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import SettingsContext from 'shared/lib/settings/SettingsContext'

// totalParts: number // общее количество деталей
// totalDays: number // общее количество дней
// workingHoursPerDay: number // рабочие часы в день
// partProductionTime: number // время изготовления одной детали в минутах
// productivity: number // производительность в десятичной форме (например, 80% = 0.8)

interface CalendarProps {
	className?: string
}

export const Calendar = ({ className }: CalendarProps) => {
	const {
		totalParts,
		totalDays,
		partProductionTime,
		productivity,
		workingHoursPerDay,
		shiftsPerDay,
		setTotalParts,
		setTotalDays,
		setPartProductionTime,
		setProductivity,
		setWorkingHoursPerDay,
		setShiftsPerDay,
	} = useContext(SettingsContext)

	const [calendarEvents, setCalendarEvents] = useState<any[]>([])

	useEffect(() => {
		generateCalendarEvents()
	}, [
		totalParts,
		totalDays,
		workingHoursPerDay,
		partProductionTime,
		productivity,
		shiftsPerDay,
	])

	const generateCalendarEvents = () => {
		const events: any[] = []
		const minutesInShift = workingHoursPerDay * 60
		const partsPerShift = Math.floor(
			(minutesInShift / partProductionTime) * (productivity / 100)
		)

		let currentDate = new Date()
		let totalProducedParts = 0
		let remainingParts = totalParts

		for (let i = 0; i < totalDays; i++) {
			const dateString = currentDate.toISOString().split('T')[0]

			for (let j = 0; j < shiftsPerDay; j++) {
				const partsForShift = Math.min(partsPerShift, remainingParts)
				remainingParts -= partsForShift

				const shiftInfoString = `Shift ${j + 1}: ${partsForShift} parts`
				events.push({
					title: shiftInfoString,
					date: dateString,
					color: remainingParts > 0 ? 'red' : undefined,
				})

				if (remainingParts <= 0) break // Остановим планирование если остаток деталей исчерпан
			}

			currentDate.setDate(currentDate.getDate() + 1)
		}

		setCalendarEvents(events)
	}

	return (
		<div>
			<h2>Production Calendar</h2>
			<div>
				<label>
					Total Parts:
					<input
						type="number"
						value={totalParts}
						onChange={(e) =>
							setTotalParts(parseInt(e.target.value))
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Total Days:
					<input
						type="number"
						value={totalDays}
						onChange={(e) => setTotalDays(parseInt(e.target.value))}
					/>
				</label>
			</div>
			<div>
				<label>
					Working Hours Per Day:
					<input
						type="number"
						value={workingHoursPerDay}
						onChange={(e) =>
							setWorkingHoursPerDay(parseInt(e.target.value))
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Part Production Time (minutes):
					<input
						type="number"
						value={partProductionTime}
						onChange={(e) =>
							setPartProductionTime(parseInt(e.target.value))
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Productivity (%):
					<input
						type="number"
						value={productivity}
						onChange={(e) =>
							setProductivity(parseInt(e.target.value))
						}
					/>
				</label>
			</div>
			<div>
				<label>
					Shifts Per Day:
					<input
						type="number"
						value={shiftsPerDay}
						onChange={(e) =>
							setShiftsPerDay(parseInt(e.target.value))
						}
					/>
				</label>
			</div>
			<FullCalendar
				plugins={[dayGridPlugin]}
				initialView="dayGridMonth"
				events={calendarEvents}
				eventContent={(eventInfo) => (
					<div>
						<b>{eventInfo.event.title}</b>
					</div>
				)}
			/>
		</div>
	)
}
