import React, { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { format } from 'date-fns'
import 'react-datepicker/dist/react-datepicker.css'
import Select, { SingleValue } from 'react-select'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddPlanForm.module.scss'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { MachineStage, StageState } from '../../model/types/plans'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import {
	getDetails,
	getIsLoading,
	getIsErrorData,
	DetailsState,
	Details,
} from 'features/productionPlanning/details'
import { MachinePlunning } from 'widgets/PlunningBoard/types/types'
import { fetchCreatePlan } from 'features/productionPlanning/machines/model/services/fetchCreatePlan'
import { generatePlan } from 'shared/lib/utils/generatedPlan'
import { fetchMachineData } from 'features/productionPlanning/machines/model/services/fetchMachine'

interface AddPlanFormProps {
	className?: string
	formData?: MachinePlunning
}

interface OptionType {
	value: string
	label: string
}

interface SelectState {
	optionShifts: OptionType[]
	value: OptionType | null
}

export const AddPlanForm = ({ className, formData }: AddPlanFormProps) => {
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getIsLoading)
	const details = useSelector(getDetails)
	const error = useSelector(getIsErrorData)

	const initialOptionShifts: OptionType[] = [
		{ value: 'A', label: 'Смена A' },
		{ value: 'B', label: 'Смена B' },
		{ value: 'C', label: 'Смена C' },
	]

	const [selectedDetail, setSelectedDetail] =
		useState<SingleValue<OptionType>>(null)
	const [stages, setStages] = useState<OptionType[]>([])
	const [isStagesDisabled, setIsStagesDisabled] = useState(true)

	const [quantity, setQuantity] = useState<number>(100)
	const [productivity, setProductivity] = useState<number>(50)
	const [startDate, setStartDate] = useState(new Date())
	const formattedDate = format(startDate, 'yyyy-MM-dd')

	const [stage, setStage] = useState({} as StageState)
	const [detail, setDetail] = useState({} as Details)

	const [selects, setSelects] = useState<SelectState[]>([
		{ optionShifts: initialOptionShifts, value: null },
	])
	const [selectedValues, setSelectedValues] = useState<
		OptionType | null | String[]
	>([])

	const detailOptions = details.map((detail) => ({
		value: detail.id,
		label: detail.nameDetail,
	}))

	const handleDetailChange = (selectedOption: SingleValue<OptionType>) => {
		setSelectedDetail(selectedOption)

		if (!selectedOption) {
			// Если выбор детали был очищен, сбрасываем состояния и блокируем селект этапов
			setStages([])
			setIsStagesDisabled(true)
		} else {
			// Если деталь выбрана, находим соответствующие этапы и разблокируем селект этапов
			setIsStagesDisabled(false)
			const detail = details.find(
				(detail) => detail.id === selectedOption.value
			)
			if (detail) {
				const stagesOptions = detail.stages.map(
					(stage: StageState) => ({
						value: stage.id,
						label: stage.nameStage,
					})
				)
				setStages(stagesOptions)
			}
		}
	}

	const handleStageChange = (selectedOption: SingleValue<OptionType>) => {
		if (!selectedOption || !selectedDetail) {
			setStage({} as StageState)
			return
		}

		const detail = details.find(
			(detail) => detail.id === selectedDetail.value
		)

		if (detail) {
			setDetail(detail)
			const stage = detail.stages.find(
				(stage: StageState) => stage.nameStage === selectedOption.label
			) as StageState | undefined

			if (stage) {
				setStage(stage)
			} else {
				setStage({} as StageState)
			}
		} else {
			setStage({} as StageState)
		}
	}

	const handleShiftChange = (
		selectedOption: SingleValue<OptionType>,
		index: number
	) => {
		const newValue = selectedOption ? selectedOption : null

		const newSelects = selects.map((select, i) =>
			i === index ? { ...select, value: newValue } : select
		)
		setSelects(newSelects)

		const newValues = newSelects
			.filter((select) => select.value !== null)
			.map((select) => select.value!.value)
		setSelectedValues(newValues)
	}

	const addShiftBtn = (e: any) => {
		e.preventDefault()
		e.stopPropagation()
		setSelects([
			...selects,
			{ optionShifts: initialOptionShifts, value: null },
		])
	}

	const onSubmitForm = () => {
		const generatedPlan = generatePlan(
			formattedDate,
			detail?.nameDetail,
			stage?.nameStage,
			stage?.timeStage,
			quantity,
			productivity / 100,
			selectedValues as string[]
		)

		const formDataFetch = { machineId: formData!.id, ...generatedPlan }

		if (formData) {
			dispatch(fetchCreatePlan(formDataFetch))
			dispatch(fetchMachineData())
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				onSubmitForm()
			}}
			className={classNames(cls.AddPlanForm, {}, ['space-y-4'])}
		>
			<div>
				<h2>Планируем для {formData?.machineName}</h2>
				<label
					htmlFor="detailName"
					className="block text-sm font-medium text-gray-700"
				>
					Название детали
				</label>
				<Select
					placeholder="Выбрать деталь из списка"
					options={detailOptions}
					className="basic-single"
					classNamePrefix="select"
					name="detail"
					value={selectedDetail}
					onChange={handleDetailChange}
					isClearable
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
					placeholder="Выбрать технологический этап"
					options={stages}
					className="basic-single"
					classNamePrefix="select"
					name="stage"
					onChange={handleStageChange}
					isDisabled={isStagesDisabled}
					isClearable
				/>
			</div>
			<div className="flex gap-1 flex-col">
				<div>
					<label
						htmlFor="parts"
						className="block text-sm font-medium text-gray-700"
					>
						Количество заготовок
					</label>
					<input
						name="parts"
						type="number"
						value={quantity.toString()}
						onChange={(e) => setQuantity(Number(e.target.value))}
						className="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>
				<div>
					<label
						htmlFor="productivity"
						className="block text-sm font-medium text-gray-700"
					>
						Производительность в %
					</label>
					<input
						name="productivity"
						type="number"
						value={productivity.toString()}
						onChange={(e) =>
							setProductivity(Number(e.target.value))
						}
						className="border border-gray-300 rounded px-3 py-2 w-full"
					/>
				</div>
				<div>
					<label
						htmlFor="shift"
						className="block text-sm font-medium text-gray-700"
					>
						Смены
					</label>
					{selects.map((select, index) => (
						<div key={index} className="mb-5">
							<Select
								placeholder="Выбрать смену"
								options={select.optionShifts}
								className="basic-single"
								classNamePrefix="select"
								name="shift"
								onChange={(selectedOption) =>
									handleShiftChange(selectedOption, index)
								}
								isClearable
								value={select.value}
							/>
						</div>
					))}
					<div>
						<button
							onClick={addShiftBtn}
							className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
						>
							+ Добавить смену
						</button>
					</div>
				</div>
			</div>
			<div>
				<label
					htmlFor="dateStart"
					className="block text-sm font-medium text-gray-700"
				>
					С какого дня планируем
				</label>
				<DatePicker
					selected={startDate}
					onChange={(date: Date) => setStartDate(date)}
					className="border border-gray-300 rounded px-3 py-2 w-full"
				/>
			</div>
			<button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none">
				Расчитать план
			</button>
		</form>
	)
}

// const handleMachineChange = (selectedOption: SingleValue<OptionType>) => {
// 	if (selectedOption) {
// 		setMachine({
// 			id: selectedOption.value,
// 			machineName: selectedOption.label,
// 		})
// 	} else {
// 		setMachine({} as MachineStage)
// 	}
// }

{
	/* <div>
				<label
					htmlFor="equipment"
					className="block text-sm font-medium text-gray-700"
				>
					Выбрать оборудование:
				</label>
				<Select
					placeholder="Выбрать оборудование"
					options={machines}
					className="basic-single"
					classNamePrefix="select"
					name="machine"
					onChange={handleMachineChange}
					isDisabled={!selectedStage}
					isClearable
				/>
			</div> */
}
