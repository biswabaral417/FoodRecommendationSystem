import React, { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

interface LoginForm {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' })
  const [errors, setErrors] = useState<Partial<LoginForm>>({})
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    setErrors(prev => ({ ...prev, [id]: '' }))
  }

  const validate = () => {
    const newErrors: Partial<LoginForm> = {}
    if (!formData.email.trim()) newErrors.email = '*Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = '*Invalid email format'

    if (!formData.password.trim()) newErrors.password = '*Password is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      console.log('Logging in with', formData)
      // TODO: do login
    }
  }

  return (
    <div className="h-fit">
      <h2 className="font-bold text-xl text-gray-700 text-center p-2">Login</h2>
      <form onSubmit={handleSubmit} className="h-fit">
        <div className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-1 font-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="border px-2 py-1 w-full outline-none"
              placeholder="Enter your email"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
          </div>

          {/* Password with toggle */}
          <div>
            <label htmlFor="password" className="block mb-1 font-semibold">
              Password
            </label>
            <div className="border w-full flex justify-between items-center px-2 py-1">
              <input
                id="password"
                type={isPasswordVisible ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(v => !v)}
                className="p-1 cursor-pointer"
                aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
              >
                {isPasswordVisible ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!formData.email || !formData.password}
            className="bg-green-600 w-full p-2 font-bold rounded-lg text-white hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Login
          </button>

          {/* Signup link */}
          <span className="text-center">
            Don't have an account?{' '}
            <a className="text-blue-600" href="/signup">
              Sign Up
            </a>
          </span>
        </div>
      </form>
    </div>
  )
}

export default Login
