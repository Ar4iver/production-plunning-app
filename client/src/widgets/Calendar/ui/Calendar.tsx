import React from 'react'
import { classNames } from '../../../shared/lib/classNames/classNames'
import cls from './Calendar.module.scss'

interface CalendarProps {
	className?: string
}

export const Calendar = ({ className }: CalendarProps) => {
	const today = new Date()
	const currentMonth = today.getMonth()
	const currentYear = today.getFullYear()
	const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
	const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

	let days: JSX.Element[] = []

	for (let i = 0; i < firstDayOfMonth; i++) {
		days.push(
			<div
				key={`empty-${i}`}
				className="border border-gray-200 h-12 w-14 flex items-center justify-center bg-gray-100"
			></div>
		)
	}

	for (let i = 1; i <= daysInMonth; i++) {
		days.push(
			<div
				key={i}
				className="border border-gray-200 h-12 w-14 flex items-center justify-center"
			>
				{i}
			</div>
		)
	}
	return (
		<div className={classNames(cls.Calendar, {}, [className])}>{days}</div>
	)
}
