import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './EquipmentCell.module.scss'

interface EquipmentCellProps {
	className?: string
	name: string
}

export const EquipmentCell = ({ className, name }: EquipmentCellProps) => {
	return (
		<div className={classNames(cls.EquipmentCell, {}, [className])}></div>
	)
}
