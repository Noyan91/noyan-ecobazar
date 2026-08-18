import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'
import { useStore } from '../context/StoreContext'
import { cn } from '../lib/utils'

export default function SignUp() {
  const { login } = useStore()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', terms: false })
  const [errors, setErrors] = useState({})
  const [show, setShow] = useState({ password: false, confirm: false })

  useEffect(() => {
    document.title = 'Create Account — Ecobazar'
  }, [])

  const submit = (event) => {
    event.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Tell us your name'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Enter a valid email address'
    if (form.password.length < 6) next.password = 'Password must be at least 6 characters'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    if (!form.terms) next.terms = 'Please accept the terms to continue'
    setErrors(next)
    if (Object.keys(next).length > 0) return

    login({ email: form.email, name: form.name })
    navigate('/account')
  }

  const inputClass = (name) =>
    cn(
      'h-12 w-full rounded-md border px-4 text-sm focus:outline-none',
      errors[name] ? 'border-danger' : 'border-gray-100 focus:border-primary',
    )

  return (
    <>
      <PageHeader trail={[{ label: 'Account', to: '/account' }, { label: 'Create Account' }]} />

      <div className="container-x py-12 lg:py-20">
        <div className="mx-auto w-full max-w-[480px] rounded-lg border border-gray-50 p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)] sm:p-10">
          <h1 className="text-center text-2xl md:text-[32px]">Create Account</h1>

          <form onSubmit={submit} className="mt-7 grid gap-4" noValidate>
            <div>
              <input
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
                placeholder="Full name"
                aria-label="Full name"
                aria-invalid={Boolean(errors.name)}
                className={inputClass('name')}
              />
              {errors.name && <p className="mt-1 text-xs text-danger">{errors.name}</p>}
            </div>

            <div>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                placeholder="Email"
                aria-label="Email"
                aria-invalid={Boolean(errors.email)}
                className={inputClass('email')}
              />
              {errors.email && <p className="mt-1 text-xs text-danger">{errors.email}</p>}
            </div>

            {[
              { key: 'password', label: 'Password' },
              { key: 'confirm', label: 'Confirm Password' },
            ].map(({ key, label }) => (
              <div key={key}>
                <div className="relative">
                  <input
                    type={show[key] ? 'text' : 'password'}
                    value={form[key]}
                    onChange={(event) => setForm({ ...form, [key]: event.target.value })}
                    placeholder={label}
                    aria-label={label}
                    aria-invalid={Boolean(errors[key])}
                    className={cn(inputClass(key), 'pr-12')}
                  />
                  <button
                    type="button"
                    onClick={() => setShow({ ...show, [key]: !show[key] })}
                    aria-label={show[key] ? `Hide ${label}` : `Show ${label}`}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600"
                  >
                    {show[key] ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors[key] && <p className="mt-1 text-xs text-danger">{errors[key]}</p>}
              </div>
            ))}

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input
                  type="checkbox"
                  checked={form.terms}
                  onChange={(event) => setForm({ ...form, terms: event.target.checked })}
                  className="h-4 w-4 accent-primary"
                />
                Accept all terms &amp; Conditions
              </label>
              {errors.terms && <p className="mt-1 text-xs text-danger">{errors.terms}</p>}
            </div>

            <Button type="submit" size="lg" full className="mt-2">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/sign-in" className="font-semibold text-gray-900 hover:text-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}
