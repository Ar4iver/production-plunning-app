import React, { useEffect } from 'react'
import cls from './MainPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Calendar } from 'widgets/Calendar'
import { fetchDetailsData } from 'entities/details'
import { useAppDispatch } from 'app/providers/StoreProvider/config/store'

interface MainPageProps {
	className?: string
}

const MainPage = ({ className }: MainPageProps) => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(fetchDetailsData())
	}, [])

	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<Calendar />
		</div>
	)
}

export default MainPage
