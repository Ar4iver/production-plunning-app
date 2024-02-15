import React, { useContext, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Calendar.module.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import SettingsContext from 'shared/lib/settings/SettingsContext'
import { AddPlanForm } from 'features/addPlanForm'
import { Modal } from 'shared/ui/Modal/Modal'

// totalParts: number // общее количество деталей
// totalDays: number // общее количество дней
// workingHoursPerDay: number // рабочие часы в день
// partProductionTime: number // время этапа изготовления детали
// productivity: number // производительность

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

	const [isOpen, setIsOpen] = useState(false)
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
					color: remainingParts > 0 ? undefined : 'red',
				})

				if (remainingParts <= 0) break
			}

			currentDate.setDate(currentDate.getDate() + 1)
		}

		setCalendarEvents(events)
	}

	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Добавить план</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<AddPlanForm />
			</Modal>
			<h2>Календарь планирования</h2>
			<div>
				<label>
					Количество деталей:{' '}
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
					Количество дней:{' '}
					<input
						type="number"
						value={totalDays}
						onChange={(e) => setTotalDays(parseInt(e.target.value))}
					/>
				</label>
			</div>
			<div>
				<label>
					Рабочие часы:{' '}
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
					Время этапа изготовления детали:{' '}
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
					Производительность (%):{' '}
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
					Количество смен:{' '}
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
