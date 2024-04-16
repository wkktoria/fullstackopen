const dummy = (blogs) => 1;

const totalLikes = (blogs) => blogs.map((blog) => blog.likes).reduce((accumulator, current) => accumulator + current, 0);

module.exports = {
  dummy,
  totalLikes,
};
