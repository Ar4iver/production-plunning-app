import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './MachinePlunningRow.module.scss'
import { MachinePlunning } from 'widgets/PlunningBoard/types/types'
import { Modal } from 'shared/ui/Modal/Modal'
import { AddPlanForm } from 'features/productionPlanning'

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
	const [isOpen, setIsOpen] = useState(false)
	const [formData, setFormData] = useState({} as MachinePlunning)

	///todo: указать тип
	const plansByDate = equipment?.plans.reduce((acc: any, plan) => {
		acc[plan.date] = plan.shiftPlans
		return acc
	}, {})

	const handlePlanning = () => {
		setFormData(equipment)
		setIsOpen(true)
	}

	return (
		<div className={classNames(cls.EquipmentRow, {}, [className])}>
			<div className={cls.columnFirst}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						flex: '0 0 100px',
						padding: '4px',
						border: '1px solid #ccc',
						justifyContent: 'space-between',
					}}
				>
					<div className={cls.equipmentName}>
						{equipment.machineName}
					</div>
					<div
						onClick={handlePlanning}
						className={cls.equipmentBtnAddPlan}
					>
						<button>+</button>
					</div>
				</div>
				<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
					<AddPlanForm formData={formData} />
				</Modal>
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
							<div className={cls.wrapperCell}>
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
