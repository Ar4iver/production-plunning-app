import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MachinePlunningRow.module.scss'
import { MachinePlunning } from 'widgets/PlunningBoard/types/types'

interface MachinePlunningRowProps {
	className?: string
	equipment: MachinePlunning
	weekDates: string[]
}

export const MachinePlunningRow = ({
	className,
	equipment,
	weekDates,
}: MachinePlunningRowProps) => {
	///todo: указать тип
	const plansByDate = equipment.plans.reduce((acc: any, plan) => {
		acc[plan.date] = plan.shiftPlans
		return acc
	}, {})

	return (
		<div className={classNames(cls.EquipmentRow, {}, [className])}>
			<div className={cls.columnFirst}>
				<div className={cls.equipmentName}>{equipment.machineName}</div>
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
