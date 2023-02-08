import { Link, Outlet } from 'react-router-dom'
import AppContainer from '@/ui/components/AppContainer'

export const Loader = () => console.log('Route loader')
export const Action = () => console.log('Route action')

export default function App() {
  return (
    <section>
      <Link to='/'>home</Link>
      <Link to='/hello'>hello</Link>
      <main>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </main>
    </section>
  )
}
