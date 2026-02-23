import Body from "./Body";
import Counter from "./Counter";
import styles from "./Template.module.css";
import { useState } from "react";

function Template({ comment, currentUser, parentId = null }) {
  const userName = currentUser.username;
  const commentPuplisher = comment.user.username;
  const [isEditing, setIsEditing] = useState(false);

  const isMyComment = userName === commentPuplisher;

  return (
    <div className={styles.comment}>
      {!isEditing && <Counter score={comment.score} />}
      <Body
        comment={comment}
        parentId={parentId}
        currentUser={currentUser}
        onEditingChange={setIsEditing}
      />
    </div>
  );
}

export default Template;
