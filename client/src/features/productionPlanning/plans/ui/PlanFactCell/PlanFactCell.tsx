import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './PlanFactCell.module.scss'

interface PlanFactCellProps {
  className?: string
}

export const PlanFactCell = ({ className }: PlanFactCellProps) => {
  return (
    <div className={classNames(cls.PlanFactCell, {}, [className])}></div>
  )
}