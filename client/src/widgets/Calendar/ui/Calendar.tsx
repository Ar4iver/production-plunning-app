import React, { useContext, useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Calendar.module.scss'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import SettingsContext from 'shared/lib/settings/SettingsContext'
import { Modal } from 'shared/ui/Modal/Modal'
import { AddPlanForm } from 'features/productionPlanning'

interface CalendarProps {
	className?: string
}

export const Calendar = ({ className }: CalendarProps) => {
	const [isOpen, setIsOpen] = useState(true)
	const [calendarEvents, setCalendarEvents] = useState<any[]>([])

	return (
		<div>
			<button
				className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
				onClick={() => setIsOpen(true)}
			>
				Запланировать
			</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<AddPlanForm />
			</Modal>
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
