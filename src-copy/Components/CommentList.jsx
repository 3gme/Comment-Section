import CommentItem from "./CommentItem";
import styles from "./CommentList.module.css";
import WrittingComment from "./WrittingComment";

// helper to resolve avatar image paths (same logic as in Body)
const avatarsContext = require.context(
  "../images/avatars",
  false,
  /\.(png|webp)$/,
);
function resolveAvatar(relativePath) {
  const fileName = relativePath?.split("/").pop();
  if (!fileName) return "";
  try {
    return avatarsContext(`./${fileName}`);
  } catch {
    return "";
  }
}

function CommentList({ comments, currentUser }) {
  const avatarSrc = resolveAvatar(currentUser.image.png);

  return (
    <>
      <ul className={styles.commentList}>
        {comments.map((comment) => (
          <CommentItem
            comment={comment}
            currentUser={currentUser}
            key={comment.id}
          />
        ))}
      </ul>
      {/* bottom box for adding a new top-level comment */}
      <WrittingComment img={avatarSrc} />
    </>
  );
}

export default CommentList;
