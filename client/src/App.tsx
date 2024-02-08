import React from 'react'
import './app/styles/index.css'
import { AppRouter } from './app/providers/router'
import { classNames } from './shared/lib/classNames/classNames'

const App = () => {
	return (
		<div className={classNames('app', {}, [])}>
			<AppRouter />
		</div>
	)
}

export default App
