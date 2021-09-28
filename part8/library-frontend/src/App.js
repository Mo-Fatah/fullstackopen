import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [page, setPage] = useState('authors')
  const [errorMessage, setErroMessage] = useState(null)

  const notify = (message) => {
    setErroMessage(message)
    setTimeout(() => {
      setErroMessage(null)
    }, 2000)
  }
  return (
    <div>
      <ErrorMessage message = {errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} notify = {notify}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />


    </div>
  )
}

export default App