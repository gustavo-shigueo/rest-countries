/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import './index.css'
import Index from './pages/Index'
import { lazy } from 'solid-js'

const root = document.getElementById('root')
const Country = lazy(() => import('./pages/Details/[Country]'))
const NotFound = lazy(() => import('./pages/NotFound/NotFound'))

render(
	() => (
		<Router>
			<Route path="/" component={Index} />
			<Route path="/details/:country" component={Country} />
			<Route path="*" component={NotFound} />
		</Router>
	),
	root!
)
