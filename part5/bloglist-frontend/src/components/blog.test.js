import React from 'react'
import { render, fireEvent  } from '@testing-library/react'
import Blog from './Blog'

test('the default view of the blog in only the title and the author', () => {
  const blog = {
    title: "Free Palestine",
    author: "hanzala",
    url: "@palestine land",
    likes: 1,
  }
  
  const component = render(
    <Blog blog = {blog}/>
  )
})