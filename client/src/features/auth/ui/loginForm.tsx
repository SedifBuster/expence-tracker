import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, useIsAuthenticated } from "../model/store";
import {
  Button,
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
} from "@headlessui/react";
import clsx from "clsx";
import { validateEmail, validatePasswordForLogin } from "~/shared/lib/validation";

export function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<{
    email?: string
    password?: string
  }>({})

  const {
    isLoading,
    error,
    signIn,
    clearError
  } = useAuthStore()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const validateForm = () => {
    const errors: typeof validationErrors = {}
    
    const emailError = validateEmail(email)
    if(emailError) errors.email = emailError

    const passwordError = validatePasswordForLogin(password)
    if(passwordError) errors.password = passwordError

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    clearError();
    setValidationErrors({})

    if(!validateForm()) {
      console.log('Validation error')
      return
    }

    try {
      await signIn(email, password)
    } catch (error) {
      console.log('Login failed, error in store', error)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated, navigate])

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit()
      }}
    >
      <Fieldset className="space-y-6 sm:p-10">
        <Legend
          className="
            text-xl
            font-semibold
            text-white
          "
        >For convenience only &#129303;</Legend>
        <Field>
          <Label
            className="
              text-sm/6
              font-medium
              text-white
          ">
            Email
          </Label>
          <Input
            value={email}
            type="email"
            onChange={(e) => {
              setEmail(e.target.value)

              if(validationErrors.email) {
                setValidationErrors(prev => ({...prev, email: undefined}))
              }
            }}
            required
            disabled={isLoading}
            className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
            validationErrors.email && 'ring-2 ring-red-500'
            )}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.email}
            </p>
          )}
        </Field>
        <Field>
          <Label
            className="
              text-sm/6
              font-medium
              text-white"
          >Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            
              if(validationErrors.password){
                setValidationErrors(prev => ({...prev, password: undefined}))
              }
            }}
            required
            disabled={isLoading}
            className={clsx(
              'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
              'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25',
              validationErrors.password && 'ring-2 ring-red-500'
            )}
          />
        </Field>
        {validationErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {validationErrors.password}
            </p>
        )}

        {/* Error from Supabase */}
        {error && (
          <div className="text-red-500 text-sm bg-red-50 p-3 rounded">
            {error}
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isLoading}
          className="
            w-full
            inline-flex
            items-center
            rounded-md
            bg-green-900
            px-3
            py-1.5
            text-sm/6
            font-semibold
            text-white
            shadow-inner
            shadow-white/10
            focus:not-data-focus:outline-none
            data-focus:outline
            data-focus:outline-white
            data-hover:bg-green-800
            data-open:bg-green-700
            cursor-pointer
            justify-center
          "
        >
        {isLoading ? 'Sign In...' : 'Sign In'}
      </Button>



      <Button 
         
        disabled={isLoading}
        className="
        w-full
            inline-flex
            items-center
            rounded-md
            bg-gray-700
            px-3
            py-1.5
            text-sm/6
            font-semibold
            text-white
            shadow-inner
            shadow-white/10
            focus:not-data-focus:outline-none
            data-focus:outline
            data-focus:outline-white
            data-hover:bg-gray-600
            data-open:bg-gray-700
            cursor-pointer
          "
      >
        GOOGLE
      </Button>

      <Button 
         
        disabled={isLoading}
        className="
        w-full
            inline-flex
            items-center
            rounded-md
            bg-gray-700
            px-3
            py-1.5
            text-sm/6
            font-semibold
            text-white
            shadow-inner
            shadow-white/10
            focus:not-data-focus:outline-none
            data-focus:outline
            data-focus:outline-white
            data-hover:bg-gray-600
            data-open:bg-gray-700
            cursor-pointer
          "
      >
        GITHUB
      </Button>
      </Fieldset>
    </form>
  )
}

//TODO: add remote sign in? regex 