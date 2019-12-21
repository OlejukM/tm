class CommentDto {
  static create (comment) {
    return {
      id: comment._id,
      by: comment.by,
      text: comment.text,
      createdAt: comment.createdAt
    }
  }
}

module.exports = CommentDto
