const lodash = require("lodash");

const dummy = (blogs) => 1;

const totalLikes = (blogs) =>
  blogs
    .map((blog) => blog.likes)
    .reduce((accumulator, current) => accumulator + current, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const favorite = blogs.reduce((accumulator, current) =>
    accumulator.likes > current.likes ? accumulator : current,
  );

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {};
  }

  const counts = lodash.countBy(blogs, "author");
  const mostAuthor = lodash.maxBy(
    lodash.keys(counts),
    (author) => counts[author],
  );

  return {
    author: mostAuthor,
    blogs: counts[mostAuthor],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};