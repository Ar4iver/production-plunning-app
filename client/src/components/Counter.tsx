import React, { useState } from 'react'

interface CounterProps {
	className?: string
}

export const Counter = () => {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount(count + 1)
	}

	const decrement = () => {
		setCount(count - 1)
	}

	return (
		<div>
			<div>{count}</div>
			<button onClick={increment}>Увеличить</button>
			<button onClick={decrement}>Уменьшить</button>
		</div>
	)
}
