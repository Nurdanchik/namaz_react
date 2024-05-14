import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import axios from "axios"

const fetchCommunities = async (accessToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(
      "https://howtonamaz.pythonanywhere.com/api/v1/tutorials/",
      config
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch communities:", error)
    return []
  }
}

export default function TutorialPage() {
  const [tutor, setCommunities] = useState([])
  useEffect(() => {
    const accessToken = localStorage.getItem("access")
    const fetchCommunitiesAndSetState = async () => {
      const communitiesData = await fetchCommunities(accessToken)
      setCommunities(communitiesData)
    }

    fetchCommunitiesAndSetState()
  }, [])

  console.log(tutor)
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Обучающие материалы
          </h2>
        </div>
        {tutor.map((tutor, index) => (
          <div key={index} className="mt-8 sm:mx-auto sm:w-full sm:max-w-3xl">
            <div className="space-y-6">
              <div className="bg-white overflow-hidden shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    {tutor.title}
                  </h3>
                  <div className="mt-4">
                    <video controls width="100%">
                      <source src={tutor.tutor} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  <p className="mt-4 text-sm text-gray-500">
                    Описание: {tutor.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
