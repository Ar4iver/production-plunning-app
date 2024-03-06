import React, { useEffect, useState } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PlunningBoard.module.scss'
import { MachinePlunning, WeekHeaderRow } from './components'
import { useCalendar } from 'shared/lib/hooks/useCalendar'
import { MachinePlunningRow } from './components/MachinePlunningRow/MachinePlunningRow'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { useSelector } from 'react-redux'
import { fetchMachineData } from 'features/productionPlanning/machines/model/services/fetchMachine'
import { getMachine } from 'features/productionPlanning/machines'

interface PlunningBoardProps {
	className?: string
}

const machineDataArray: MachinePlunning[] = [
	{
		machineName: 'Doosan 1914',
		plans: [
			{
				date: '2024-03-04',
				detailInfo: {
					product: {
						id: 'sdfsdf324234',
						nameDetail: 'C75145/1990 - Ступица «Ромашка»',
						stages: [],
					},
					stage: {
						id: '223sdfsdf234',
						nameStage: 'Обработка первой стороны ступицы',
						timeStage: 18,
						machines: [],
					},
				},
				shiftPlans: [
					{
						id: '0sdfxc6',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'A',
						plan: 20,
						fact: null,
					},
					{
						id: '5sdf34',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'B',
						plan: 20,
						fact: null,
					},
					{
						id: '2sdzcxb2',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'C',
						plan: 20,
						fact: null,
					},
				],
			},
			{
				date: '2024-03-05',
				detailInfo: {
					product: {
						id: 'sdfsdf324234',
						nameDetail: 'C75145/1990 - Ступица «Ромашка»',
						stages: [],
					},
					stage: {
						id: '223sdfsdf234',
						nameStage: 'Обработка первой стороны ступицы',
						timeStage: 18,
						machines: [],
					},
				},
				shiftPlans: [
					{
						id: '0sdfxc6',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'A',
						plan: 20,
						fact: null,
					},
					{
						id: '5sdf34',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'B',
						plan: 20,
						fact: null,
					},
					{
						id: '2sdzcxb2',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'C',
						plan: 20,
						fact: null,
					},
				],
			},
		],
	},
	{
		machineName: 'Doosan 1970',
		plans: [
			{
				date: '2024-03-04',
				detailInfo: {
					product: {
						id: 'sdlvndhaf24234',
						nameDetail: 'C75145/1990 - Ступица «Ромашка»',
						stages: [],
					},
					stage: {
						id: '223sdfsdf234',
						nameStage: 'Обработка второй стороны ступицы',
						timeStage: 20,
						machines: [],
					},
				},
				shiftPlans: [
					{
						id: '0sdfg6',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'A',
						plan: 20,
						fact: null,
					},
					{
						id: '0sscxc6',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'B',
						plan: 15,
						fact: null,
					},
					{
						id: '0sdlkc6',
						shiftInfo: {
							people: 3,
							productivity: 75,
						},
						shift: 'C',
						plan: 25,
						fact: null,
					},
				],
			},
		],
	},
]

export const PlunningBoard = ({ className }: PlunningBoardProps) => {
	const { weekDates } = useCalendar()
	const dispatch = useAppDispatch()
	const machinePlansArray = useSelector(getMachine)

	useEffect(() => {
		dispatch(fetchMachineData())
	}, [])

	return (
		<div className={classNames(cls.planningBoard, {}, [className])}>
			<WeekHeaderRow />
			{machinePlansArray.map((machine) => (
				<MachinePlunningRow
					key={machine.machineName}
					equipment={machine}
					weekDates={weekDates}
				/>
			))}
		</div>
	)
}
