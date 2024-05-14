import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import axios from "axios"
import { Link } from "react-router-dom"

const fetchCommunities = async (accessToken) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await axios.get(
      "https://howtonamaz.pythonanywhere.com/api/v1/communities/",
      config
    )
    return response.data
  } catch (error) {
    console.error("Failed to fetch communities:", error)
    return []
  }
}

export default function MainPage() {
  const [communities, setCommunities] = useState([])
  const [comments, setComments] = useState({})
  const [showComments, setShowComments] = useState({}) // Состояние для отслеживания показа комментариев

  useEffect(() => {
    const accessToken = localStorage.getItem("access")
    const fetchCommunitiesAndSetState = async () => {
      const communitiesData = await fetchCommunities(accessToken)
      setCommunities(communitiesData)
    }

    fetchCommunitiesAndSetState()
  }, [])

  const getComment = async (id) => {
    try {
      const accessToken = localStorage.getItem("access")
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const response = await axios.get(
        `https://howtonamaz.pythonanywhere.com/api/v1/communities/${id}/comments`,
        config
      )
      setComments({ ...comments, [id]: response.data })
      setShowComments({ ...showComments, [id]: true }) // Установка состояния показа комментариев для данного поста
    } catch (error) {
      console.log(error)
    }
  }

  const hideComment = (id) => {
    setShowComments({ ...showComments, [id]: false }) // Скрыть комментарии для данного поста
  }

  const sendComment = async (id, commentText) => {
    try {
      const accessToken = localStorage.getItem("access")
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
      const requestBody = {
        text: commentText,
      }
      const response = await axios.post(
        `https://howtonamaz.pythonanywhere.com/api/v1/communities/${id}/comments/create/`,
        requestBody,
        config
      )
      console.log("Comment sent successfully:", response.data)
    } catch (error) {
      console.error("Failed to send comment:", error)
    }
  }

  console.log(communities)
  const handleSubmit = async (event, community) => {
    event.preventDefault() // Отменить стандартное действие отправки формы
    const commentText = event.target.elements.comment.value // Получить текст комментария из поля формы
    await sendComment(community.id, commentText) // Отправить комментарий
  }
  return (
    <div>
      <Header />
      <div className=" bg-gray-100 pt-[20px]">
        <div className="flex  justify-end mx-6">
          <Link
            to="/create"
            className=" py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Создать комьюнити +
          </Link>
        </div>
      </div>
      <div className="bg-gray-100">
        <ul>
          {communities.map((community, index) => (
            <div
              key={index}
              className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
            >
              <div className="sm:mx-auto sm:w-full sm:max-w-3xl">
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-4 sm:px-6">
                    <img
                      src={community.image}
                      alt="Placeholder Image"
                      className="w-full "
                    />
                  </div>
                  <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg font-medium text-gray-900">
                      {community.title}
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {community.description}
                    </p>
                  </div>
                  <div className="px-4 py-4 sm:px-6">
                    {showComments[community.id] ? (
                      <button
                        onClick={() => hideComment(community.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        Скрыть комментарии
                      </button>
                    ) : (
                      <button
                        onClick={() => getComment(community.id)}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Показать комментарии
                      </button>
                    )}
                    <form
                      className="py-6"
                      onSubmit={(event) => handleSubmit(event, community)}
                    >
                      <input
                        type="text"
                        name="comment"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Введите комментарий"
                      />
                      <button
                        type="submit"
                        className="mt-2 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Добавить комментарий
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              {/* Показывать комментарии только если они есть для этого поста */}
              {showComments[community.id] &&
                comments[community.id] &&
                comments[community.id].map((comment, commentIndex) => (
                  <div
                    key={commentIndex}
                    className="bg-slate-200 border border-indigo-200 p-5 rounded-lg mx-[35rem] my-[1rem]"
                  >
                    <span>{comment.text}</span>
                  </div>
                ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  )
}
