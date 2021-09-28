import { gql, useQuery } from '@apollo/client'  
import React from 'react'
import { ALL_AUTHORS } from '../queries'
import SetBirthYear from './SetBirthYear'
const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  if (!props.show) {
    return null
  }
  if ( !result.data ) {
    return <div>...loading</div>
  }
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <SetBirthYear notify = {props.notify}/>
    </div>
  )
}

export default Authors
