import Body from "./Body";
import { useState } from "react";
import { useDataContext } from "./Context";
import Counter from "./Counter";
import styles from "./RepliesList.module.css";
import ReplyComposer from "./ReplyComposer";

function RepliesList({ replies, commentID }) {
  const {
    replyTo,
    setReplyTo,
    addReplyToReply,
    deleteReply,
    updateReply,
    updateScore,
  } = useDataContext();
  const [editingReplyId, setEditingReplyId] = useState(null);

  return (
    <ul className={styles.repliesList}>
      {replies.map((reply) => (
        <li key={reply.id}>
          {editingReplyId === reply.id ? (
            <ReplyComposer
              initialValue={reply.user.username}
              buttonLabel="UPDATE"
              defaultText={reply.content}
              onSubmitText={(updatedText) => {
                updateReply(commentID, reply.id, updatedText);
                setEditingReplyId(null);
              }}
            />
          ) : (
            <article className={styles.replyItem}>
              <Counter
                score={reply.score}
                onChange={(delta) => updateScore(commentID, reply.id, delta)}
              />
              <Body
                comment={reply}
                onDelete={() => deleteReply(commentID, reply.id)}
                onEdit={() => {
                  setReplyTo(null);
                  setEditingReplyId(reply.id);
                }}
              />
            </article>
          )}
          {replyTo && replyTo === reply.user.username && (
            <ReplyComposer
              initialValue={reply.user.username}
              onReply={addReplyToReply}
              commentID={commentID}
              id={reply.id}
              autoFocusInput
            />
          )}
        </li>
      ))}
    </ul>
  );
}

export default RepliesList;
