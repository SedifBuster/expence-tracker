import { Button } from "@headlessui/react";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuthStore, useIsAuthenticated } from "~/features/auth";

export function Header ()  {
  const [isScrolled, setIsScrolled] = useState(false);
  const {
    signOut
  } = useAuthStore()
  const navigate = useNavigate()
  const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try{
      signOut()
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <NavLink to={"/"} className={"p-2 text-2xl font-semibold"}>
         <h1>Expense tracker</h1>
        </NavLink>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <NavLink to={"/auth"} end>
              {
                !isAuthenticated
                ?
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
                  Sign in 👤
                </Button>
                :
                <Button onClick={() => handleSignOut()}
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
                  SignOut
                </Button>
              }
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};