import { Outlet } from 'react-router-dom'
import AppContainer from '@/ui/components/AppContainer'

export default function App() {
  return (
    <section>
      <main>
        <AppContainer>
          <Outlet />
        </AppContainer>
      </main>
    </section>
  )
}
