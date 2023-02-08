import { Link, Outlet } from 'react-router-dom'
import AppContainer from '@/ui/components/AppContainer'

export default function App() {
  return (
    <section>
      <Link to='/'>home</Link>

      <main>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </main>
    </section>
  )
}
