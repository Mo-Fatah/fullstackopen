import React from 'react';

const NewBlogForm = ({
  handleNewBlog,
  blogTitle,
  setBlogTitle,
  blogAuthor,
  setBlogAuthor,
  blogUrl,
  setBlogUrl,
  blogLikes,
  setBlogLikes,
}) => {
    return (
    <form onSubmit= {handleNewBlog}>
      <div>
        Title
        <input
          type= "text"
          value= {blogTitle}
          name= "blog title"
          onChange= {({target}) => setBlogTitle(target.value)}
        />
      </div>
      <div>
        Author
        <input
          type= "text"
          value= {blogAuthor}
          name= "blog Author"
          onChange= {({target}) => setBlogAuthor(target.value)}
        />
      </div>
      <div>
        URL
        <input
          type= "text"
          value= {blogUrl}
          name= "blog url"
          onChange= {({target}) => setBlogUrl(target.value)}
        />
      </div>
      <div>
        Likes
        <input
          type= "number"
          value= {blogLikes}
          name= "blog likes"
          onChange= {({target}) => setBlogLikes(target.value)}
        />
      </div>
      <button type= "submit">submit</button> 
    </form>
    )
}

export default NewBlogForm;