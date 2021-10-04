const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    bookCount: Int!
    authorsCount: Int!
    findAuthor(name: String!): Author
    findBook(title: String!): Book
    allBooks: [Book!]!
    allAuthors: [Author!]!
    booksBy(author: String, genre: String):[Book!]
    me: User
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String
    id: ID!
    born: Int 
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book

    editAuthor (name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`
module.exports = typeDefs
