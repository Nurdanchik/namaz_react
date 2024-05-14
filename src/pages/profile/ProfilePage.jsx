import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import axios from "axios"

const fetchUserProfile = async (accessToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(
      "https://howtonamaz.pythonanywhere.com/api/v1/users/profile/",
      config
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch user profile:", error)
    return null
  }
}

export default function ProfilePage() {
  const [userProfile, setUserProfile] = useState(null)
  const accessToken = localStorage.getItem("access")

  useEffect(() => {
    const fetchUserProfileAndSetState = async () => {
      const profileData = await fetchUserProfile(accessToken)
      setUserProfile(profileData)
    }

    fetchUserProfileAndSetState()
  }, [accessToken])

  return (
    <div>
      <Header />
      <div className="bg-white overflow-hidden shadow rounded-lg border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Ваш профиль
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Пусть Аллах наставит вас на путь истенный !
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Имя пользователя
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.username}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Почта</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Город</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.city}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Страна</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.country}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Пол</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {userProfile.sex === "male" ? "Мужской" : "Женский"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
