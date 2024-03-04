import React from 'react'
import { format } from 'date-fns'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './WeekHeaderRow.module.scss'
import { useCalendar } from 'shared/lib/hooks/useCalendar'

interface WeekHeaderRowProps {
	className?: string
}

///todo: вывести с помощью типов
const shifts = ['A', 'B', 'C']

export const WeekHeaderRow = ({ className }: WeekHeaderRowProps) => {
	const { days } = useCalendar()

	return (
		<div className={classNames(cls.WeekHeaderRow, {}, [className])}>
			{days.map((day) => (
				<div key={day.toString()} className={cls.dateColumn}>
					<div className={cls.dateHeader}>
						{format(day, 'EEE dd/MM')}
					</div>
					<div className={cls.cellWrapper}>
						{shifts.map((shift) => (
							<div key={shift} className={cls.shiftCell}>
								{shift}
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	)
}
