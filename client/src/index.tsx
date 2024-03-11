import { createRoot } from 'react-dom/client'
import './app/styles/index.scss'
import App from './app/App'
import { BrowserRouter } from 'react-router-dom'
import { SettingsProvider } from 'app/providers/SettingsProvider'
import { StoreProvider } from 'app/providers/StoreProvider'

const container = document.getElementById('root')!

const root = createRoot(container)

root.render(
	<StoreProvider>
		<BrowserRouter>
			<SettingsProvider>
				<App />
			</SettingsProvider>
		</BrowserRouter>
	</StoreProvider>
)
