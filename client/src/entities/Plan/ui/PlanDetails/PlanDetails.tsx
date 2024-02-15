import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PlanDetails.module.scss'

interface PlanDetailsProps {
	className?: string
	id?: string
}

export const PlanDetails = ({ className }: PlanDetailsProps) => {
	return <div className={classNames(cls.PlanDetails, {}, [className])}></div>
}
