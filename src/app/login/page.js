import { redirect } from 'next/navigation'

const Login = () => {
  redirect('/api/auth/signin')
}

export default Login
