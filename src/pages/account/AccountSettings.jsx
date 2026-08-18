import { useEffect, useRef, useState } from 'react'
import Avatar from '../../components/ui/Avatar'
import Button from '../../components/ui/Button'
import { useStore } from '../../context/StoreContext'
import { cn } from '../../lib/utils'

const COUNTRIES = ['United States', 'United Kingdom', 'Bangladesh', 'Kenya', 'Canada', 'Australia']
const STATES = ['New Mexico', 'California', 'Illinois', 'Texas', 'Florida', 'New York']

function Input({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-gray-600">{label}</span>
      <input
        type={type}
        value={value ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className="h-12 w-full rounded-md border border-gray-100 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-primary focus:outline-none"
      />
    </label>
  )
}

function Card({ title, children, onSubmit, action = 'Save Changes' }) {
  return (
    <form onSubmit={onSubmit} className="overflow-hidden rounded-lg border border-gray-50">
      <h2 className="border-b border-gray-50 px-6 py-4 text-lg text-gray-900">{title}</h2>
      <div className="p-6">
        {children}
        <Button type="submit" className="mt-6">
          {action}
        </Button>
      </div>
    </form>
  )
}

export default function AccountSettings() {
  const { user, updateUser, toast } = useStore()
  const fileRef = useRef(null)
  const [profile, setProfile] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    avatar: user.avatar,
  })
  const [billing, setBilling] = useState(user.billing ?? {})
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })

  useEffect(() => {
    document.title = 'Account Settings — Ecobazar'
  }, [])

  const pickAvatar = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setProfile((current) => ({ ...current, avatar: String(reader.result) }))
    reader.readAsDataURL(file)
  }

  return (
    <div className="flex flex-col gap-6">
      <Card
        title="Account Settings"
        onSubmit={(event) => {
          event.preventDefault()
          updateUser(profile)
        }}
      >
        <div className="grid gap-6 md:grid-cols-[1fr_220px]">
          <div className="grid gap-4">
            <Input
              label="First name"
              value={profile.firstName}
              onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            />
            <Input
              label="Last Name"
              value={profile.lastName}
              onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
            <Input
              label="Phone Number"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="flex flex-col items-center gap-4">
            <Avatar
              name={`${profile.firstName} ${profile.lastName}`}
              src={profile.avatar}
              size={128}
              className="text-3xl"
            />
            <input ref={fileRef} type="file" accept="image/*" onChange={pickAvatar} className="hidden" />
            <Button type="button" variant="outline" onClick={() => fileRef.current?.click()}>
              Choose Image
            </Button>
          </div>
        </div>
      </Card>

      <Card
        title="Billing Address"
        onSubmit={(event) => {
          event.preventDefault()
          updateUser({ billing })
        }}
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <Input
            label="First name"
            value={billing.firstName}
            onChange={(e) => setBilling({ ...billing, firstName: e.target.value })}
          />
          <Input
            label="Last name"
            value={billing.lastName}
            onChange={(e) => setBilling({ ...billing, lastName: e.target.value })}
          />
          <Input
            label="Company Name (optional)"
            value={billing.company}
            onChange={(e) => setBilling({ ...billing, company: e.target.value })}
          />
        </div>
        <div className="mt-4">
          <Input
            label="Street Address"
            value={billing.street}
            onChange={(e) => setBilling({ ...billing, street: e.target.value })}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="block">
            <span className="mb-2 block text-sm text-gray-600">Country / Region</span>
            <select
              value={billing.country ?? ''}
              onChange={(e) => setBilling({ ...billing, country: e.target.value })}
              className={cn(
                'h-12 w-full rounded-md border border-gray-100 bg-white px-4 text-sm focus:border-primary focus:outline-none',
                billing.country ? 'text-gray-900' : 'text-gray-400',
              )}
            >
              <option value="">Select</option>
              {COUNTRIES.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-gray-600">States</span>
            <select
              value={billing.state ?? ''}
              onChange={(e) => setBilling({ ...billing, state: e.target.value })}
              className={cn(
                'h-12 w-full rounded-md border border-gray-100 bg-white px-4 text-sm focus:border-primary focus:outline-none',
                billing.state ? 'text-gray-900' : 'text-gray-400',
              )}
            >
              <option value="">Select</option>
              {STATES.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </select>
          </label>
          <Input
            label="Zip Code"
            value={billing.zip}
            onChange={(e) => setBilling({ ...billing, zip: e.target.value })}
          />
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="Email"
            type="email"
            value={billing.email}
            onChange={(e) => setBilling({ ...billing, email: e.target.value })}
          />
          <Input
            label="Phone"
            value={billing.phone}
            onChange={(e) => setBilling({ ...billing, phone: e.target.value })}
          />
        </div>
      </Card>

      <Card
        title="Change Password"
        action="Change Password"
        onSubmit={(event) => {
          event.preventDefault()
          if (passwords.next.length < 6) {
            toast('New password must be at least 6 characters', 'error')
            return
          }
          if (passwords.next !== passwords.confirm) {
            toast('New passwords do not match', 'error')
            return
          }
          setPasswords({ current: '', next: '', confirm: '' })
          toast('Password updated')
        }}
      >
        <Input
          label="Current Password"
          type="password"
          value={passwords.current}
          onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
          placeholder="Password"
        />
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Input
            label="New Password"
            type="password"
            value={passwords.next}
            onChange={(e) => setPasswords({ ...passwords, next: e.target.value })}
            placeholder="Password"
          />
          <Input
            label="Confirm Password"
            type="password"
            value={passwords.confirm}
            onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
            placeholder="Password"
          />
        </div>
      </Card>
    </div>
  )
}
