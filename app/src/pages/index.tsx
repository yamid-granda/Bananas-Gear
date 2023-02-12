import { Navigate } from 'react-router-dom'
import { useHasLoggedUser } from '../hooks/loggedUser'

export default function Home() {
  const hasLoggedUser = useHasLoggedUser()

  if (!hasLoggedUser)
    return <Navigate to="/login" />

  // const router = useNavigate()
  // router('/hello')
  // const location = useLocation()
  // location.
  // const router = useRouter()

  // useEffect(() => {
  //   router('/hello')
  // }, [])

  return (
    <div className="ss-home-page">
      home page
    </div>
  )
}
