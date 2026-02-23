import Body from "./Body";
import { useState } from "react";
import styles from "./Comment.module.css";
import { useDataContext } from "./Context";
import Counter from "./Counter";
import RepliesList from "./RepliesList";
import ReplyComposer from "./ReplyComposer";

function Comment({ comment }) {
  const [isEditing, setIsEditing] = useState(false);
  const { score, replies = [], user, id, content } = comment;
  const { replyTo, setReplyTo, addReplyToComment, deleteComment, updateComment } =
    useDataContext();
  const hasReplies = replies.length > 0;
  const username = user.username;

  return (
    <li className={styles.commentBlock}>
      {isEditing ? (
        <ReplyComposer
          buttonLabel="UPDATE"
          defaultText={content}
          onSubmitText={(updatedText) => {
            updateComment(id, updatedText);
            setIsEditing(false);
          }}
        />
      ) : (
        <article className={styles.layout}>
          <Counter score={score} />
          <Body
            comment={comment}
            onDelete={() => deleteComment(id)}
            onEdit={() => {
              setReplyTo(null);
              setIsEditing(true);
            }}
          />
        </article>
      )}
      {replyTo && replyTo === username && (
        <ReplyComposer
          initialValue={username}
          onReply={addReplyToComment}
          id={id}
        />
      )}
      {hasReplies && <RepliesList replies={replies} commentID={id} />}
    </li>
  );
}

export default Comment;
