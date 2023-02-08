import { Navigate } from 'react-router-dom'

export default function Home() {
  if (true)
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
