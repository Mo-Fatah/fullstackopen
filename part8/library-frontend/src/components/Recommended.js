import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { ALL_BOOKS, USER } from "../queries";

const Recommended = (props) => {
  const booksResult =   useQuery(ALL_BOOKS)
  const userResult =  useQuery(USER)
  const [ allBooks, setAllBooks ] = useState([])
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    if (userResult.data)
      setUser(userResult.data.me)
      
    if (booksResult.data)
      setAllBooks(booksResult.data.allBooks)

  }, [booksResult, userResult])  
  
  if( !props.show ) 
    return null
  if ( !booksResult.data || user.data )
    return <div>...loading</div>

  
  const books = allBooks.filter(book => book.genres.includes(user.favoriteGenre))
     
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
    </div>
  )
}

export default Recommended