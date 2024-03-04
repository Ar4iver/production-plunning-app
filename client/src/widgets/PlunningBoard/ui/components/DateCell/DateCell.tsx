import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './DateCell.module.scss'

interface DateCellProps {
	className?: string
	date: string
}

export const DateCell = ({ className, date }: DateCellProps) => {
	return <div className={classNames(cls.DateCell, {}, [className])}></div>
}
