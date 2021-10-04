import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born 
      id
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const ADD_BOOK = gql`
    mutation creatBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
      addBook(
        title: $title,
        published: $published,
        author: $author,
        genres: $genres
      ) {
        title,
        author {
          name
        }
      }
    }
`

export const SET_BIRTHYEAR = gql`
    mutation editBirthDay($name: String!, $setBornTo: Int!) {
      editAuthor (
        name: $name,
        setBornTo: $setBornTo
      ) {
        name
        born
      }
    }
`
export const LOGIN = gql`
    mutation loginForm($username: String!, $password: String!) {
      login(username: $username, password: $password) {
        value
      }
    }
`

export const USER = gql`
    query {
      me {
        username
        favoriteGenre
      }
    }
`

export const BOOK_ADDED = gql`
    subscription {
      bookAdded {
        title
        author {
          name
        }
      }
    }
`