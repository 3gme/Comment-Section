import styles from "./RepliesList.module.css";
import Reply from "./Reply";

function RepliesList({ replies, currentUser, parentId }) {
  return (
    <div className={styles.repliesList}>
      <div className={styles.pipe}></div>
      <ul className={styles.replies}>
        {replies.map((reply) => (
          <Reply
            comment={reply}
            currentUser={currentUser}
            parentId={parentId}
            key={reply.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default RepliesList;
