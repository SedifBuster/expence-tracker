import { Button, Description, Field, Input, Label } from "@headlessui/react";

export function LoginPage() {


  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-8 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <h1 className="w-125 max-w-[100vw] p-4 text-center text-2xl font-semibold">
            Sign In / Sign Up
          </h1>
        </header>
        <p className="max-w-2xl w-full space-y-6 px-2 text-center">
          тут библиотеку на авто + через гугл и тд + форм хук
           + оптимистик мб также два таба рег \ авто
        </p>
      
        <Field>
        <Label className="text-sm/6 font-medium text-white">Login</Label>
        <Description className="text-sm/6 text-white/50"></Description>
        <Input
          className= "border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"/>
        </Field>
        <Field>
        <Label className="text-sm/6 font-medium text-white">Password</Label>
        <Description className="text-sm/6 text-white/50"></Description>
        <Input
          className= "border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"/>
        </Field>
        <Button
          className="
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
          Sign in
        </Button>
      </div>
    </main>
  );
}