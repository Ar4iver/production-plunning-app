import React, { useCallback, useEffect } from 'react'
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
					key={machine.id}
					equipment={machine}
					weekDates={weekDates}
				/>
			))}
		</div>
	)
}
