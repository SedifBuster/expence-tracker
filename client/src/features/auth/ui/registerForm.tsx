import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../model/store";
import { Button, Description, Field, Fieldset, Input, Label, Legend } from "@headlessui/react";
import clsx from "clsx";

export function RegisterForm () {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signUp, isLoading, error, clearError } = useAuthStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    try {
      await signUp(email, password)
      navigate('/dashboard')
    } catch {}
  }

  return (
 <form onSubmit={handleSubmit} className="space-y-4">
       <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
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
        {isLoading ? 'Sign Up...' : 'Sign Up'}
      </Button>
      </Fieldset>
    </form>
  )
}

