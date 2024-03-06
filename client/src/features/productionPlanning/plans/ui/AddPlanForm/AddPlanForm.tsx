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
import { fetchCreatePlan } from '../../model/services/fetchCreatePlan'
import { getDetails, getIsLoading, getIsErrorData } from 'features/productionPlanning/details'

interface AddPlanFormProps {
	className?: string
}

interface OptionType {
	value: string
	label: string
}

export const AddPlanForm = ({ className }: AddPlanFormProps) => {
	const dispatch = useAppDispatch()
	const isLoading = useSelector(getIsLoading)
	const details = useSelector(getDetails)
	const error = useSelector(getIsErrorData)

	const [selectedDetail, setSelectedDetail] =
		useState<SingleValue<OptionType>>(null)
	const [stages, setStages] = useState<OptionType[]>([])
	const [isStagesDisabled, setIsStagesDisabled] = useState(true)
	const [selectedStage, setSelectedStage] =
		useState<SingleValue<OptionType>>(null)
	const [machines, setMachines] = useState<OptionType[]>([])
	const [quantity, setQuantity] = useState<number>(100)
	const [productivity, setProductivity] = useState<number>(50)
	const [shifts, setShifts] = useState<number>(3)
	const [startDate, setStartDate] = useState(new Date())
	const formattedDate = format(startDate, 'yyyy-MM-dd')
	const [detailInfoId, setDetailInfoId] = useState('')
	const [detailInfoName, setDetailInfoName] = useState('')
	const [stage, setStage] = useState({} as StageState)
	const [machine, setMachine] = useState({} as MachineStage)

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
			setDetailInfoId(detail!.id)
			setDetailInfoName(detail!.nameDetail)
			if (detail) {
				const stagesOptions = detail.stages.map((stage: StageState) => ({
					value: stage.id,
					label: stage.nameStage,
				}))
				setStages(stagesOptions)
			}
		}
	}

	const handleStageChange = (selectedOption: SingleValue<OptionType>) => {
		setSelectedStage(selectedOption)

		if (!selectedOption) {
			setMachines([])
		} else {
			const stage = details
				.find((detail) => detail.id === selectedDetail?.value)
				?.stages.find(
					(stage: StageState) => stage.id === selectedOption.value
				) as StageState | undefined

			setStage(stage!)

			if (stage) {
				const machineOptions = stage.machines.map(
					(machine: MachineStage) => ({
						value: machine.id,
						label: machine.machineName,
					})
				)
				setMachines(machineOptions)
			}
		}
	}

	const handleMachineChange = (selectedOption: SingleValue<OptionType>) => {
		if (selectedOption) {
			setMachine({
				id: selectedOption.value,
				machineName: selectedOption.label,
			})
		} else {
			setMachine({} as MachineStage)
		}
	}

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault()
				const formData = {
					id: uuidv4(),
					detailInfo: {
						id: detailInfoId,
						detailName: detailInfoName,
					},
					stage: {
						id: stage.id,
						nameStage: stage.nameStage,
						timeStage: stage.timeStage,
					},
					machine: {
						id: machine.id,
						machineName: machine.machineName,
					},
					parts: quantity,
					productivity: productivity,
					shifts: shifts,
					startDate: formattedDate,
				}
				if (formData) {
					dispatch(fetchCreatePlan(formData))
				}
			}}
			className={classNames(cls.AddPlanForm, {}, ['space-y-4'])}
		>
			<div>
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
			<div>
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
			</div>
			<div className="flex gap-1">
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
						Количество смен
					</label>
					<input
						name="shift"
						type="number"
						value={shifts.toString()}
						onChange={(e) => setShifts(Number(e.target.value))}
						className="border border-gray-300 rounded px-3 py-2 w-full"
					/>
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
