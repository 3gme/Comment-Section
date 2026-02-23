import RepliesList from "./RepliesList";
import Template from "./Template";
import WrittingComment from "./WrittingComment";
import { useDataContext } from "./Context";
import styles from "./CommentItem.module.css";

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

function CommentItem({ comment, currentUser }) {
  const replies = comment.replies;
  const { replyingTo, cancelReply } = useDataContext();
  const avatarSrc = resolveAvatar(comment.user.image.png);

  return (
    <li>
      <Template comment={comment} currentUser={currentUser} />
      {/* reply box appears as full-width block below comment */}
      {replyingTo === comment.id && (
        <div className={styles.replyBoxContainer}>
          <WrittingComment
            img={avatarSrc}
            parentId={comment.id}
            replyingToUsername={comment.user.username}
            initialText={`@${comment.user.username} `}
            onCancel={cancelReply}
          />
        </div>
      )}
      {/* only render RepliesList when there's at least one reply */}
      {comment.replies.length > 0 && (
        <RepliesList
          currentUser={currentUser}
          replies={replies}
          parentId={comment.id}
        />
      )}
    </li>
  );
}

export default CommentItem;
