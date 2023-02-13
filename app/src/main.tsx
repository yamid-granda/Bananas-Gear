import '../../styles/native-variables.scss'
import '../../styles/reset.scss'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './routes.gen'
import './plugins/i18n'

const container = document.getElementById('root')!
createRoot(container).render(<StrictMode><Routes /></StrictMode>)
