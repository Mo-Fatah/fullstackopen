const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const AllLikes = blogs.map((blog) => Number(blog.likes));
  const likesCount = AllLikes.reduce((sum, likes) => sum + likes, 0);
  return likesCount;
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const reducer = (mostLiked, curr) => (mostLiked.likes < curr.likes ? curr : mostLiked);
  return blogs.reduce(reducer, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
