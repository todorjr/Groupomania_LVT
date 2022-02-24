const Post = function (post) {
  this.id = post.id;
  this.comment = post.comment;
  this.idPost = post.idPost;
  this.date = new Date();
  this.text = post.text;
  this.image = post.image;
};

module.exports = Post;
