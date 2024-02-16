import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddPlanForm.module.scss'
import DatePicker from 'react-datepicker'
import Select from 'react-select'
import 'react-datepicker/dist/react-datepicker.css'
import { addPlanAsync } from 'entities/Plan'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { v4 as uuidv4 } from 'uuid'
import { Plan } from 'entities/Plan/model/types/plan'

interface AddPlanFormProps {
	className?: string
}

export const AddPlanForm = ({ className }: AddPlanFormProps) => {
	const detailOptions = [
		{ value: '1', label: '131530/1R - осевой тормозной диск' },
		{ value: '2', label: 'Деталь B' },
		{ value: '3', label: 'Деталь C' },
	]

	const stageOptions = [
		{ value: '1', label: 'Первая сторона' },
		{ value: '2', label: 'Вторая сторона' },
		{ value: '3', label: 'Чистовая обработка' },
		{ value: '3', label: 'Сверление/Фрезерование' },
	]

	const dispatch = useAppDispatch()

	const [formData, setFormData] = useState<Plan>({
		id: uuidv4(),
		detailName: detailOptions[0].value,
		stage: stageOptions[0].value,
		quantity: '',
		startDate: new Date(),
		endDate: new Date(),
		productivity: '',
		equipment: '',
		shiftsPerDay: '',
	})

	const handleTextChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSelectDetailNameChange = (selectedOption: any) => {
		setFormData({ ...formData, detailName: selectedOption.value })
	}

	const handleSelectDetailStageChange = (selectedOption: any) => {
		setFormData({ ...formData, stage: selectedOption.value })
	}

	const handleDateChange = (
		date: Date | null,
		field: 'startDate' | 'endDate'
	) => {
		if (date) {
			setFormData({ ...formData, [field]: date })
		}
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const planData = {
			...formData,
		}

		dispatch(addPlanAsync(planData))
	}
	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<div>
					<label
						htmlFor="detailName"
						className="block text-sm font-medium text-gray-700"
					>
						Название детали
					</label>
					<Select
						id="detailName"
						options={detailOptions}
						value={detailOptions.find(
							(option) => option.value === formData.detailName
						)}
						onChange={handleSelectDetailNameChange}
					/>
				</div>
				<div>
					<label
						htmlFor="detailStage"
						className="block text-sm font-medium text-gray-700"
					>
						Технологический этап
					</label>
					<Select
						id="detailStage"
						options={stageOptions}
						value={stageOptions.find(
							(option) => option.value === formData.stage
						)}
						onChange={handleSelectDetailStageChange}
					/>
				</div>
				<input
					name="quantity"
					placeholder="Количество"
					type="number"
					value={formData.quantity}
					onChange={(e) => handleTextChange(e)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
				<div>
					<label>Дата старта: </label>
					<DatePicker
						selected={formData.startDate}
						onChange={(date) => handleDateChange(date, 'startDate')}
						className="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>
				<div>
					<label>Дата окончания: </label>
					<DatePicker
						selected={formData.endDate}
						onChange={(date) => handleDateChange(date, 'endDate')}
						className="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>
				<input
					name="productivity"
					placeholder="Продуктивность (%)"
					type="number"
					value={formData.productivity}
					onChange={(e) => handleTextChange(e)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
				<input
					name="shiftsCount"
					placeholder="Количество смен"
					type="number"
					value={formData.shiftsPerDay}
					onChange={(e) => handleTextChange(e)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
				<input
					name="equipment"
					placeholder="Оборудование"
					value={formData.equipment}
					onChange={(e) => handleTextChange(e)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
				<button
					type="submit"
					onSubmit={() => handleSubmit}
					className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
				>
					Принять
				</button>
			</form>
		</div>
	)
}
