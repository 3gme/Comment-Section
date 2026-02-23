import styles from "./Reply.module.css";
import Template from "./Template";
import WrittingComment from "./WrittingComment";
import { useDataContext } from "./Context";

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

function Reply({ currentUser, comment, parentId }) {
  const { replyingTo, cancelReply } = useDataContext();
  const avatarSrc = resolveAvatar(comment.user.image.png);

  return (
    <>
      <Template
        comment={comment}
        currentUser={currentUser}
        parentId={parentId}
      />
      {/* reply box appears below each reply */}
      {replyingTo === comment.id && (
        <div className={styles.replyBoxContainer}>
          <WrittingComment
            img={avatarSrc}
            parentId={parentId}
            replyingToUsername={comment.user.username}
            initialText={`@${comment.user.username} `}
            onCancel={cancelReply}
          />
        </div>
      )}
    </>
  );
}

export default Reply;
