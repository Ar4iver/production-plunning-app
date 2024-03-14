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
				const plansForDate = equipment.plans.flatMap((plan: any) =>
					plan.dailyPlans.filter(
						(dailyPlan: any) => dailyPlan.date === date
					)
				)

				const shifts = ['A', 'B', 'C']

				return (
					<div className={cls.dayColumn} key={date}>
						{shifts.map((shift) => {
							const shiftPlans = plansForDate.flatMap(
								(dailyPlan) =>
									dailyPlan.plans.filter(
										(plan: any) => plan.shift === shift
									)
							)

							return shiftPlans.length > 0 ? (
								shiftPlans.map((plan, index) => (
									<div
										className={cls.shiftPlanFactCell}
										key={`${shift}-${index}`}
									>
										<div className={cls.plan}>
											{plan.quantity}
										</div>
										<div className={cls.fact}>—</div>
									</div>
								))
							) : (
								<div
									className={cls.shiftPlanFactCell}
									key={`${shift}-empty`}
								>
									<div className={cls.plan}>—</div>
									<div className={cls.fact}>—</div>
								</div>
							)
						})}
					</div>
				)
			})}
		</div>
	)
}
