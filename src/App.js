import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [value, setValue] = useState('random person')
  const [title, setTitle] = useState('name')
  const getPerson = async () => {
    setLoading(true)
    const response = await fetch(url)
    const data = await response.json()
    const person = data.results[0]
    const { phone, email } = person
    const {
      picture:{
        large
      },
    } = person
    const { gender } = person
    const { first, last } = person.name
    const {
      dob: { age },
    } = person
    const {
      street: { number, name },
    } = person.location

    const newPerson = {
      large,
      phone,
      email,
      gender,
      age,
      street: `${number} ${name}`,
      name: `${first} ${last}`,
    }
    setPerson(newPerson)
    setLoading(false)
    setTitle('name')
    setValue(newPerson.name)
  }

  useEffect(() => {
    getPerson()
  }, [])
  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }


  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={(person && person.large) || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title} is</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              className='icon'
              data-label='name'
              onMouseOver = {handleValue}
            >
              <FaUser />
            </button>
            <button
              className='icon'
               data-label='email'
               onMouseOver = {handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button className='icon'
            data-label='email'
            onMouseOver = {handleValue}
             >
              
              <FaCalendarTimes />
            </button>
            <button
            data-label='street'
            onMouseOver = {handleValue}
              className='icon'
          
            >
              <FaMap />
            </button>
            <button
             data-label='phone'
             onMouseOver = {handleValue}
               className='icon'
             
            >
              <FaPhone />
            </button>
            <button
            
              data-label='gender'
              onMouseOver = {handleValue}
                className='icon'
             
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={{getPerson}}>
          {
            loading ? 'loading...' :'random user'
          }
          </button>
        </div>
      </div>
    </main>
  )
}

export default App

    
 

