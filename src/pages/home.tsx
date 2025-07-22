import React from 'react'
import NavbarUI from '../components/custom/navbar'
const Home = () => {
  return (
    <div>
      <NavbarUI />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Welcome to MyApp</h1>
        <p className="mb-4">This is the home page of the application.</p>
        <p>Explore the features and functionalities we offer.</p>
      </div>
    </div>
  )
}

export default Home