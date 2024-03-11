import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './AddMachinesForm.module.scss'
import Select from 'react-select'
import { fetchMachineData } from '../../model/services/fetchMachine'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useSelector } from 'react-redux'
import { getMachine } from '../../model/selectors/getMachine'
import { Machine } from '../../model/types/machines'

interface AddMachinesFormProps {
	className?: string
}

export const AddMachinesForm = ({ className }: AddMachinesFormProps) => {
	const dispatch = useAppDispatch()
	const machines = useSelector(getMachine)

	const machineOptions = machines.map((machine: Machine) => ({
		value: machine.id,
		label: machine.machineName,
	}))

	return (
		<div className={classNames(cls.AddMachinesForm, {}, [className])}>
			<div className={cls.select}>
				<label
					htmlFor="machineName"
					className="block text-sm font-medium text-gray-700"
				>
					Название оборудования
				</label>
				<Select
					placeholder="Выбрать оборудование из списка"
					options={machineOptions}
					className="basic-single"
					classNamePrefix="select"
					name="machine"
					isClearable
				/>
			</div>
			<button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none">
				Принять
			</button>
		</div>
	)
}
