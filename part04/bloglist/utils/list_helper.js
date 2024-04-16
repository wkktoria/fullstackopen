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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
