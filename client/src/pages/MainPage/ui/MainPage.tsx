import React, { useContext } from 'react'
import cls from './MainPage.module.scss'
import { classNames } from 'shared/lib/classNames/classNames'
import { Calendar } from 'widgets/Calendar'

interface MainPageProps {
	className?: string
}

const MainPage = ({ className }: MainPageProps) => {
	return (
		<div className={classNames(cls.MainPage, {}, [className])}>
			<Calendar />
		</div>
	)
}

export default MainPage
