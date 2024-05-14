import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainPage from "./pages/home/MainPage"
import ProfilePage from "./pages/profile/ProfilePage"
import TutorialsPage from "./pages/tutorial/TutorialsPage"
import TimePage from "./pages/time/TimePage"
import RegisterPage from "./pages/login/RegisterPage"
import CreatePage from "./pages/createcomu/CreatePage"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<MainPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/tutorials" element={<TutorialsPage />} />
        <Route path="/timenamaz" element={<TimePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  )
}
