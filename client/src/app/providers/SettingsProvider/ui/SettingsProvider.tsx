import React, { ReactNode, useEffect, useState } from 'react'
import SettingsContext from 'shared/lib/settings/SettingsContext'

interface SettingsProvider {
	children?: ReactNode
}

export const SettingsProvider = ({ children }: SettingsProvider) => {
	const getLocalStorageSettings = (key: string, defaultValue: number) => {
		const storedSettings = localStorage.getItem(key)
		return storedSettings !== null
			? JSON.parse(storedSettings)
			: defaultValue
	}

	const [totalParts, setTotalParts] = useState(
		getLocalStorageSettings('totalParts', null)
	)

	const [totalDays, setTotalDays] = useState(
		getLocalStorageSettings('totalDays', null)
	)

	const [workingHoursPerDay, setWorkingHoursPerDay] = useState(
		getLocalStorageSettings('workingHoursPerDay', null)
	)

	const [partProductionTime, setPartProductionTime] = useState(
		getLocalStorageSettings('partProductionTime', null)
	)

	const [productivity, setProductivity] = useState(
		getLocalStorageSettings('productivity', null)
	)

	const [shiftsPerDay, setShiftsPerDay] = useState(
		getLocalStorageSettings('shiftsPerDay', null)
	)

	useEffect(() => {
		localStorage.setItem('totalParts', JSON.stringify(totalParts))
		localStorage.setItem('totalDays', JSON.stringify(totalDays))
		localStorage.setItem(
			'workingHoursPerDay',
			JSON.stringify(workingHoursPerDay)
		)
		localStorage.setItem(
			'partProductionTime',
			JSON.stringify(partProductionTime)
		)
		localStorage.setItem('productivity', JSON.stringify(productivity))
		localStorage.setItem('shiftsPerDay', JSON.stringify(shiftsPerDay))
	}, [
		totalParts,
		totalDays,
		workingHoursPerDay,
		partProductionTime,
		productivity,
		shiftsPerDay,
	])

	return (
		<SettingsContext.Provider
			value={{
				totalParts,
				totalDays,
				workingHoursPerDay,
				partProductionTime,
				productivity,
				shiftsPerDay,
				setTotalParts,
				setTotalDays,
				setWorkingHoursPerDay,
				setPartProductionTime,
				setProductivity,
				setShiftsPerDay,
			}}
		>
			{children}
		</SettingsContext.Provider>
	)
}
