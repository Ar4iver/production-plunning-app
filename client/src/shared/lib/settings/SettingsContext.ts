import { createContext } from 'react'

export interface SettingsContextType {
	totalParts: number
	totalDays: number
	workingHoursPerDay: number
	partProductionTime: number
	productivity: number
	shiftsPerDay: number
	setTotalParts: React.Dispatch<React.SetStateAction<number>>
	setTotalDays: React.Dispatch<React.SetStateAction<number>>
	setWorkingHoursPerDay: React.Dispatch<React.SetStateAction<number>>
	setPartProductionTime: React.Dispatch<React.SetStateAction<number>>
	setProductivity: React.Dispatch<React.SetStateAction<number>>
	setShiftsPerDay: React.Dispatch<React.SetStateAction<number>>
}

const SettingsContext = createContext<SettingsContextType | undefined>(
	undefined
)

export default SettingsContext
