import React, { useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddPlanForm.module.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface AddPlanFormProps {
	className?: string
}

export const AddPlanForm = ({ className }: AddPlanFormProps) => {
	const [formData, setFormData] = useState({
		detailName: '',
		quantity: '',
		startDate: new Date(),
		endDate: new Date(),
		productivity: '',
		shiftsCount: '',
		equipment: '',
	})

	const handleTextChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
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
	}

	return (
		<div className={className}>
			<form onSubmit={handleSubmit} className="space-y-4">
				<input
					name="detailName"
					placeholder="Название детали"
					value={formData.detailName}
					onChange={(e) => handleTextChange(e)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
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
					value={formData.shiftsCount}
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
					className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
				>
					Добавить план
				</button>
			</form>
		</div>
	)
}
