import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ErrorMessage from './components/ErrorMessage'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErroMessage] = useState(null)
  const [ token, setToken ] = useState(null)

  const client = useApolloClient()
  
  const notify = (message) => {
    setErroMessage(message)
    setTimeout(() => {
      setErroMessage(null)
    }, 2000)
  }
  const handleLougout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const handleLogin = (tokenValue) => {
    setToken(tokenValue)
    setPage('authors')
  }
  const login = () => {
    return <button onClick= {() => setPage('login')}>login</button>
  }
  const logout = () => {
    return <button onClick= {() => handleLougout()}>logout</button>
  }
  const addBook = () => {
    return <button onClick = {() => setPage('add')}>add book</button> 
  }
  const recommended = () => {
    return  <button onClick = {() => setPage('recommended') }>recommended</button>
  }

  const updateCacheWith = (newBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, newBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(newBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <ErrorMessage message = {errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token !== null ? addBook() : null}
        {token === null ? login(): logout() }
        {token !== null ? recommended() : null}
      </div>

      <Authors
        show={page === 'authors'} notify = {notify}
      />

      <Books
        show={ page === 'books' } 
      />
      
      <Recommended show = { page === 'recommended' }
      />

      <NewBook
        show={page === 'add'} notfiy = {notify} token = {token} update = {updateCacheWith}
      />

      <Login 
        show= {page === 'login'} notify = {notify} handleLogin = {handleLogin}
      />

    </div>
  )
}

export default App