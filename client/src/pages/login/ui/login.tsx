import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { LoginForm, RegisterForm } from "~/features/auth";

export function LoginPage() {
  return (
  <main className="flex items-center justify-center pt-16 pb-4">
    <div className="flex w-full justify-center px-4 pt-12">
      <div className="w-full max-w-lg">
        <TabGroup>
          <TabList className="flex gap-4">
            <Tab 
              className="
                rounded-full
                px-3
                py-1
                text-xl
                font-semibold
                text-white 
                focus:not-data-focus:outline-none 
                data-focus:outline
                data-focus:outline-white
                data-hover:bg-white/5
                data-selected:bg-white/10
                data-selected:data-hover:bg-white/10
                cursor-pointer
                "
            >
              Sign In
            </Tab>
            <Tab 
              className="
                rounded-full
                px-3
                py-1
                text-xl
                font-semibold
                text-white
                focus:not-data-focus:outline-none 
                data-focus:outline
                data-focus:outline-white
                data-hover:bg-white/5
                data-selected:bg-white/10
                data-selected:data-hover:bg-white/10
                cursor-pointer
                "
            >
              Sign Up
            </Tab>
          </TabList>
            <TabPanels className="mt-3">
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <LoginForm />
            </TabPanel>
            <TabPanel className="rounded-xl bg-white/5 p-3">
              <RegisterForm />
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  </main>
  );
}