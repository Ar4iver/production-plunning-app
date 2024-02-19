import React from 'react'
import './styles/index.css'
import { AppRouter } from './providers/router'
import { classNames } from 'shared/lib/classNames/classNames'

const App = () => {
	return (
		<div className={classNames('app', {}, [])}>
			<AppRouter />
		</div>
	)
}

export default App
