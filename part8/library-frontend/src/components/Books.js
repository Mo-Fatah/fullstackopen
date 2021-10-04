import React, { useEffect, useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import BookGenres from './BookGenres'

const Books = (props) => {
  const result =  useQuery(ALL_BOOKS)
  const [ books, setBooks ] = useState([])
  const [ allBooks, setAllBooks ] = useState([])
  const [ genre, setGenre ] = useState('all')

  useEffect(() => {
    if(result.data){
      setAllBooks(result.data.allBooks)
    }
 }, [result])

  useEffect(() => {
    if (genre === 'all') {
      setBooks(allBooks)
    } else {
      setBooks(allBooks.filter(book => book.genres.indexOf(genre) !== -1 ))
    }
  }, [ allBooks, genre ])

  if (!props.show) {
    return null
  }
  if ( !result.data ) {
    return <div>...loading</div>
  }
  
  const handleGenre = (genreRequested) => setGenre(genreRequested)

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <BookGenres genres = {allBooks.map(book => book.genres)} handleGenre = {handleGenre}/>
    </div>
  )
}

export default Books