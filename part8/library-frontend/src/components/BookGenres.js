import React from "react";

const BookGenres = ({ genres, handleGenre }) => {
  const genresSet = new Set()
  for (let i = 0; i < genres.length; i++){
    for (let j = 0; j < genres[i].length; j++) {
      genresSet.add(genres[i][j])
    }
  }
  const genresArray = [...genresSet]
  return (
    <div>
      {genresArray.map(genre => (
        <button onClick = {() => handleGenre(genre)}>{genre}</button>
      ))}
      <button onClick= {() => handleGenre('all')}>all</button>
    
    </div>
  )
}

export default BookGenres