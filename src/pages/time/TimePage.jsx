import React, { useState } from "react"
import Header from "../../components/Header"
import axios from "axios"

export default function TimePage() {
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [formData, setFormData] = useState({
    date: "",
    city: "",
    country: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(
        `https://howtonamaz.pythonanywhere.com/api/v1/prayer-timings/${formData.date}/${formData.city}/${formData.country}`
      )
      setPrayerTimes(response.data.data.timings)
    } catch (error) {
      console.error("Failed to fetch prayer times:", error)
    }
  }

  console.log(prayerTimes)

  return (
    <div>
      <Header />
      {prayerTimes ? (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Время намаза на {formData.date}
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
              <div className="grid grid-cols-1 gap-4">
                <ul className="divide-y divide-gray-200">
                  {Object.entries(prayerTimes).map(([prayerName, time]) => (
                    <li className="py-4 flex justify-between">
                      <p className="text-sm text-gray-500">{prayerName}</p>
                      <p className="text-sm text-gray-500">{time} AM</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Время намаза
            </h2>
          </div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-8 shadow sm:rounded-lg sm:px-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Дата (дд-мм-гггг)
                  </label>
                  <div className="mt-1">
                    <input
                      id="date"
                      name="date"
                      type="text"
                      value={formData.date}
                      onChange={handleChange}
                      autoComplete="date"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Город
                  </label>
                  <div className="mt-1">
                    <input
                      id="city"
                      name="city"
                      type="text"
                      value={formData.city}
                      onChange={handleChange}
                      autoComplete="city"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Страна
                  </label>
                  <div className="mt-1">
                    <input
                      id="country"
                      name="country"
                      type="text"
                      value={formData.country}
                      onChange={handleChange}
                      autoComplete="country"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Показать время намаза
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
