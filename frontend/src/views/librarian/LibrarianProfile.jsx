import React, { useState, useEffect } from 'react'
import Bpclogo from "../../assets/bpclogo.png"
import axios from 'axios'
import LibrarianHeader from '../../components/header/librarian/LibrarianHeader'

const LibrarianProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token') // Assuming the token is stored in localStorage
        const response = await axios.get('http://localhost:8000/api/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          password: '', // Don't show password in the form
        })
      } catch (err) {
        setError('Failed to fetch user data')
      }
    }
    fetchUserData()
  }, [])

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo({ ...userInfo, [name]: value })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      await axios.put(
        'http://localhost:8000/api/profile',
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      alert('Profile updated successfully')
    } catch (err) {
      setError('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full h-screen flex overflow-hidden">
      <LibrarianHeader />
      <div className="w-full h-full flex flex-col">
        <div className="w-full h-screen flex flex-col gap-4 justify-center items-center">
          <img src={Bpclogo} className="w-24" />
          <p className="text-lg font-semibold">Profile</p>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center">
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleChange}
              className="h-10 outline outline-1 outline-slate-300 rounded-lg p-2 w-64"
              placeholder="Fullname"
            />
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleChange}
              className="h-10 outline outline-1 outline-slate-300 rounded-lg p-2 w-64"
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={userInfo.password}
              onChange={handleChange}
              className="h-10 outline outline-1 outline-slate-300 rounded-lg p-2 w-64"
              placeholder="Password"
            />
            <button
              type="submit"
              className="w-64 h-10 bg-blue-500 rounded-lg text-white hover:bg-yellow-400"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LibrarianProfile
