import React, { useEffect, useState } from 'react'
import cls from './MainPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'
import { PlunningBoard } from 'widgets/PlunningBoard'
import { AddMachinesForm, AddPlanForm } from 'features/productionPlanning'
import { Modal } from 'shared/ui/Modal/Modal'
import { fetchDetailsData } from 'features/productionPlanning/details'

interface MainPageProps {
	className?: string
}

const MainPage = ({ className }: MainPageProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchDetailsData())
	}, [])
	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<div className={classNames(cls.actionBtns, {}, [className])}>
				<button
					className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 focus:outline-none"
					onClick={() => setIsOpen(true)}
				>
					Добавить оборудование
				</button>
			</div>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<AddMachinesForm />
			</Modal>
			<PlunningBoard />
		</div>
	)
}

export default MainPage
