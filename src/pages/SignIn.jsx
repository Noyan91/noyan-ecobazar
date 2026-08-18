import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { useStore } from '../context/StoreContext'
import { cn } from '../lib/utils'

export default function SignIn() {
  const { login, toast } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    document.title = 'Sign In — Ecobazar'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    login({ email: form.email })
    navigate('/account')
  }

  return (
    <>
      <PageHeader trail={[{ label: 'Account', to: '/account' }, { label: 'Login' }]} />

      <div className="container-x py-12 lg:py-20">
        <div className="mx-auto w-full max-w-[480px] rounded-lg border border-gray-50 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-10">
          <h1 className="text-center text-2xl md:text-[32px]">Sign In</h1>

          <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
            <div>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="Email"
                aria-label="Email"
                aria-invalid={Boolean(errors.email)}
                className={cn(
                  'h-12 w-full rounded-md border px-4 text-sm focus:outline-none',
                  errors.email ? 'border-danger' : 'border-gray-100 focus:border-primary',
                )}
              />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(event) => setForm({ ...form, password: event.target.value })}
                  placeholder="Password"
                  aria-label="Password"
                  aria-invalid={Boolean(errors.password)}
                  className={cn(
                    'h-12 w-full rounded-md border px-4 pr-12 text-sm focus:outline-none',
                    errors.password ? 'border-danger' : 'border-gray-100 focus:border-primary',
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-danger">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="h-4 w-4 accent-primary" /> Remember me
              </label>
              <button
                type="button"
                onClick={() => toast('Password reset links are disabled in this demo')}
                className="text-gray-600 transition-colors hover:text-primary"
              >
                Forget Password
              </button>
            </div>

            <Button type="submit" size="lg" full className="mt-2">
              Login
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link to="/sign-up" className="font-semibold text-gray-900 hover:text-primary">
              Register
            </Link>
          </p>
          <p className="mt-4 rounded-md bg-gray-50 px-4 py-3 text-center text-xs text-gray-500">
            Demo store — any valid email and a 6-character password will sign you in.
          </p>
        </div>
      </div>
    </>
  )
}
