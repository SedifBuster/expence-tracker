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

export function LoginForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {
    isLoading,
    error,
    signIn,
    clearError
  } = useAuthStore()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  const handleSubmit = async () => {
    clearError();
    try {
      await signIn(email, password)
    } catch (error) {
      console.log('Login failed, error in store')
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard')
    }
  }, [isAuthenticated])

  return (
    <form
      onSubmit={(e) => {e.preventDefault(); handleSubmit()}}
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
          <Label
            className="
              text-sm/6
              font-medium
              text-white"
          >Password</Label>
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
/**
 * 
 * Базовый вариант (рекомендуется для большинства случаев)
regex
^[^\s@]+@([^\s@]+\.)+[^\s@]+$
Что проверяет:

Не содержит пробелов

Имеет формат something@domain.zone

Допускает точки в локальной части (например, ivan.ivanov@mail.ru)


Стандартный вариант (8+ символов, буквы + цифры)
regex
^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$
Что требует:

Минимум 8 символов

Хотя бы одна буква

Хотя бы одна цифра

Только латиница и цифры


 * 
 */