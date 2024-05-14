import React from "react"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div>
      <nav
        className="mx-auto flex items-center justify-between p-6 lg:px-8 border-b-indigo-600 border-b-[2px] w-full"
        aria-label="Global"
      >
        <div>
          <Link to="/home" className="font-bold text-[24px]">
            HowToNamaz
          </Link>
        </div>
        <div className="flex gap-5">
          <Link
            to="/home"
            className="hover:font-bold transition-all duration-300 ease-in-out  hover:duration-300"
          >
            Комьюнити
          </Link>
          <Link
            to="/tutorials"
            className="hover:font-bold transition-all duration-300 ease-in-out  hover:duration-300"
          >
            Туториалы
          </Link>
          <Link
            to="/timenamaz"
            className="hover:font-bold transition-all duration-300 ease-in-out  hover:duration-300"
          >
            Время намаза
          </Link>
        </div>
        <div>
          <Link to="/profile">Профиль</Link>
        </div>
      </nav>
    </div>
  )
}
