const Post = function (post) {
  this.id = post.id;
  this.date = new Date();
  this.text = post.text;
  this.image = post.image;
  this.userId = post.userId;
};

module.exports = Post;
