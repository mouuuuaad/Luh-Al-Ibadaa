import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Image from 'next/image'
import React from 'react'
import logo from "../../public/Logo.svg"
function Header() {
  return (
    <header className="bg-gradient-to-t from-black to-slate-900 shadow-lg">
      <div className="mx-auto flex h-20 max-w-screen-xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        <div className="hidden items-center lg:flex space-x-2">
          <h1 className="text-3xl font-bold text-white">
            Luh Al-Ibadaa<span className='text-blue-600 text-lg font-extrabold'>.</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <LoginLink postLoginRedirectURL="/dashboard">
            <button className="px-8 w-[150px] py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-medium text-white shadow-xl hover:shadow-blue-500/30 transition-all">
              Login
            </button>
          </LoginLink>

          <RegisterLink>
            <button className="px-8 w-[150px] py-4 rounded-xl border border-white/20 bg-white/5 text-lg font-medium text-white hover:bg-white/10 transition-all">
              Register
            </button>
          </RegisterLink>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex w-[95%] justify-between items-center lg:hidden">
        <LoginLink postLoginRedirectURL="/dashboard">
            <button className="px-8 w-[150px] py-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-lg font-medium text-white shadow-xl hover:shadow-blue-500/30 transition-all">
              Login
            </button>
          </LoginLink>

          <RegisterLink>
            <button className="px-8 w-[150px] py-4 rounded-xl border border-white/20 bg-white/5 text-lg font-medium text-white hover:bg-white/10 transition-all">
              Register
            </button>
          </RegisterLink>
        </div>
      </div>
    </header>
  )
}

export default Header
