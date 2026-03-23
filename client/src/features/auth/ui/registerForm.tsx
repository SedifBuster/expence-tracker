import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../model/store";
import { Button, Description, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import { validateEmail, validatePasswordForSignup } from "~/shared/lib/validation";
import clsx from "clsx";
import { validateNameForSignup } from "~/shared/lib/validation/validation";

export function RegisterForm () {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState<{
    name?: string
    email?: string
    password?: string
  }>({})

  const { signUp, isLoading, error, clearError } = useAuthStore()

  const validateForm = () => {
    const errors: typeof validationErrors = {}

    const nameError = validateNameForSignup(name)
    if(nameError) errors.name = nameError

    const emailError = validateEmail(email)
    if(emailError) errors.email = emailError
  
    const passwordError = validatePasswordForSignup(password)
    if(passwordError) errors.password = passwordError
  
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async () => {
    setValidationErrors({})
    clearError();

    if(!validateForm()) {
      console.log('Validation error')
      return
    }

    try {
      await signUp(email, password, name)
    } catch (error) {
      console.log('Register failed, error in store', error)
    }
  }

  return (
    <form 
      onSubmit={(e) => { e.preventDefault(); handleSubmit()}}
      className="space-y-4"
    >
       <Fieldset className="space-y-6 rounded-xl  p-6 sm:p-10">
        <Legend className="text-base/7 font-semibold text-white">To create a convenient account just for you</Legend>
        <Field>
        <Label className="text-sm/6 font-medium text-white">Name</Label>
        <Description className="text-sm/6 text-white/50">Use your real name so people will recognize you.</Description>
        <Input
        value={email}
          
          onChange={(e) => setEmail(e.target.value)}

        disabled={isLoading}
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        />
      </Field>
        <Field>
        <Label className="text-sm/6 font-medium text-white">Email</Label>
        <Description className="text-sm/6 text-white/50">Use your real name so people will recognize you.</Description>
        <Input
        value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          required
        disabled={isLoading}
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        />
      </Field>

      <Field>
        <Label className="text-sm/6 font-medium text-white">Password</Label>
        <Description className="text-sm/6 text-white/50">Use your real name so people will recognize you.</Description>
        <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
          className={clsx(
            'mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white',
            'focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25'
          )}
        />
      </Field>

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
        {isLoading ? 'Sign Up...' : 'Sign Up'}
      </Button>
      </Fieldset>
    </form>
  )
}

