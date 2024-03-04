import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PlunningBoard.module.scss'
import { EquipmentColumn, WeekHeaderRow } from './components'
import { Equipment } from '../types/types'
import { useCalendar } from 'shared/lib/hooks/useCalendar'

interface PlunningBoardProps {
	className?: string
}

const equipmentDataArray: Equipment[] = [
	{
		name: 'Doosan 1914',
		days: [
			{
				date: '2024-03-04',
				shiftPlans: [
					{ shift: 'A', plan: 20, fact: null },
					{ shift: 'B', plan: 15, fact: null },
					{ shift: 'C', plan: 25, fact: 18 },
				],
			},
			{
				date: '2024-03-05',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
			{
				date: '2024-03-07',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
			{
				date: '2024-03-09',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
		],
	},
	{
		name: 'Doosan 1970',
		days: [
			{
				date: '2024-03-04',
				shiftPlans: [
					{ shift: 'A', plan: 20, fact: 5 },
					{ shift: 'B', plan: 15, fact: 1 },
					{ shift: 'C', plan: 25, fact: 7 },
				],
			},
			{
				date: '2024-03-06',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
			{
				date: '2024-03-08',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
			{
				date: '2024-03-10',
				shiftPlans: [
					{ shift: 'A', plan: 22, fact: 20 },
					{ shift: 'B', plan: 18, fact: null },
					{ shift: 'C', plan: 30, fact: 29 },
				],
			},
		],
	},
]

export const PlunningBoard = ({ className }: PlunningBoardProps) => {
	const { weekDates } = useCalendar()
	return (
		<div className={classNames(cls.planningBoard, {}, [className])}>
			<WeekHeaderRow />
			{equipmentDataArray.map((equipment) => (
				<EquipmentColumn
					key={equipment.name}
					equipment={equipment}
					weekDates={weekDates}
				/>
			))}
		</div>
	)
}
