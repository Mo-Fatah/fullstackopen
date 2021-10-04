const Book = require('./models/book')
const Author = require('./models/author')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubSub = new PubSub()
const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(), 
    authorsCount: () => Author.collection.countDocuments(),
    findAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      return author
    },
    
    findBook: async (root, args) => {
      const book = await Book.findOne({title: args.title})
      return book
    },
    
    allBooks: async () => await Book.find({}).populate('author'),
    allAuthors: async () => await Author.find({ }),
    
    /*booksBy: (root, args) => {
      if(args.author && args.genres) {
        return books.filter(book => book.author === args.author &&
          bokks.genres.includes(args.genre))
      }
      if(args.author){
        return  books.filter(book => book.author === args.author)
      }
      if(args.genre) {
        return books.filter(book => book.genres.includes(args.genre))
      }
    },*/

    me: (root, args, context) => {
      return context.currentUser
    } 
  },

  Mutation: {
    addBook: async (root, args, context) => {
      if ( !context.currentUser ) 
        throw new AuthenticationError("not authenticated")

      const author = await Author.findOne({name: args.author})
      if ( !author ) {
        const newAuthor = new Author({
          name: args.author 
        })
        await newAuthor.save()
      }
      
      const foundAuthor = await Author.findOne({name: args.author})
      const newBook = new Book({...args, author: foundAuthor})
      try {
        await newBook.save()
      } catch (error) {
        throw new UserInputError(error.message)
      } 

      pubSub.publish('BOOK_ADDED', { bookAdded: newBook })
      return newBook
    },

    editAuthor: async (root, args, context) => {
      if ( !context.currentUser)
        throw new AuthenticationError("not authinticated")
      const author = await Author.findOne({name: args.name}) 
      if (!author) return null
      
      author.born = args.setBornTo
      await author.save()
      return author
    }, 

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      })
      try {
        await user.save() 
        return user
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args, context) => {
      const user = await User.findOne({username: args.username})
      
     if( !user || args.password !== "1234" ) {
        throw new UserInputError('wrong credentials')
      }
      const userForToken = {
        username: user.username,
        id: user.id
      }
      const token = jwt.sign(userForToken, process.env.SECRET)
      return {value: token}
    }   
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED']) 
    }
  }
}

module.exports = resolvers