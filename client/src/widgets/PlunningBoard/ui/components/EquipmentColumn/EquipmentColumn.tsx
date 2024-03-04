import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EquipmentColumn.module.scss'
import { Equipment } from 'widgets/PlunningBoard/types/types'

interface EquipmentColumnProps {
	className?: string
	equipment: Equipment
	weekDates: string[]
}

export const EquipmentColumn = ({
	className,
	equipment,
	weekDates,
}: EquipmentColumnProps) => {
	const plansByDate = equipment.days.reduce((acc: any, day) => {
		acc[day.date] = day.shiftPlans
		return acc
	}, {})
	return (
		<div className={classNames(cls.EquipmentRow, {}, [className])}>
			<div className={cls.columnFirst}>
				<div className={cls.equipmentName}>{equipment.name}</div>
				<div className={cls.shiftPlanFactCell}>
					<div className={cls.plan}>План</div>
					<div className={cls.fact}>Факт</div>
				</div>
			</div>
			{weekDates.map((date) => {
				const shiftPlans = plansByDate[date] || []

				return (
					<div className={cls.dayColumn} key={date}>
						{shiftPlans.length > 0 ? (
							shiftPlans.map((shiftPlan: any) => (
								<div
									className={cls.shiftPlanFactCell}
									key={shiftPlan.shift}
								>
									<div className={cls.plan}>
										{shiftPlan.plan}
									</div>
									<div className={cls.fact}>
										{shiftPlan.fact !== null
											? shiftPlan.fact
											: '—'}
									</div>
								</div>
							))
						) : (
							///?????????? todo: решить проблему с пустыми ячейками
							<div className={cls.test}>
								<div className={cls.shiftPlanFactCell}>
									<div className={cls.plan}>—</div>
									<div className={cls.fact}>—</div>
								</div>
								<div className={cls.shiftPlanFactCell}>
									<div className={cls.plan}>—</div>
									<div className={cls.fact}>—</div>
								</div>
								<div className={cls.shiftPlanFactCell}>
									<div className={cls.plan}>—</div>
									<div className={cls.fact}>—</div>
								</div>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
