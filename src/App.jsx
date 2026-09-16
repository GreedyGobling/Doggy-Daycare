import {  useState, useEffect } from 'react'
import './App.css'
import Admin from './components/Admin.jsx'

function App() {

  const [dogs, setDogs] = useState([])
useEffect(() => {
  fetch('https://api.jsonbin.io/v3/b/6aa7c3abac6210605acad585')
    .then(response => {
      console.log(response)
      return response.json()
    })
    .then(data => {
      console.log(data.record.record)
      setDogs(data.record.record)
    })
    .catch(error => console.error('Error fetching dogs:', error))
}, [])

  return (

    <div>
      <header>
        <h1>Doggy Daycare</h1>

    <nav>
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
      </header>

      <section className="welcome">
        <h2>Welcome to Doggy Daycare</h2>
        <p>A safe and fun place for your furry friends!</p>

        {
        dogs.length > 0 && (
          <img src={dogs[0].image} alt={dogs[0].name} />
        )}
        
      </section>
    </div>
  )
}

export default App
