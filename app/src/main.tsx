import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './routes.gen'
import '../../styles/native-variables.scss'
import '../../styles/reset.scss'

const container = document.getElementById('root')!
createRoot(container).render(<StrictMode><Routes /></StrictMode>)
