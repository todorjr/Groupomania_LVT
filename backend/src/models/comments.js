const Comment = function (comment) {
  this.id = comment.id;
  this.date = new Date();
  this.userId = comment.userId;
  this.comment = comment.comment;
};

module.exports = Comment;
