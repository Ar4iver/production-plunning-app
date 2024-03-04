import React from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ShiftCell.module.scss'

interface ShiftsCellProps {
  className?: string
}

export const ShiftCell = ({ className }: ShiftsCellProps) => {
  return (
    <div className={classNames(cls.ShiftsCell, {}, [className])}></div>
  )
}