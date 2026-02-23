import styles from "./WrittingComment.module.css";

// const avatarsContext = require.context(
//   "../images/avatars",
//   false,
//   /\.(png|webp)$/,
// );

// function resolveAvatar(relativePath) {
//   const fileName = relativePath?.split("/").pop();
//   if (!fileName) return "";

//   try {
//     return avatarsContext(`./${fileName}`);
//   } catch {
//     return "";
//   }
// }

import { useState } from "react";
import { useDataContext } from "../../src/Context";

function WrittingComment({
  img,
  parentId = null,
  replyingToUsername = null,
  initialText = "",
  isEditing = false,
  onChange,
  onSubmit,
  onCancel,
}) {
  const { addNewComment } = useDataContext();
  const [text, setText] = useState(initialText);

  // when the parent supplies an onChange callback (editing scenario) call it too
  function handleInput(e) {
    setText(e.target.value);
    if (onChange) onChange(e.target.value);
  }

  function handleButton() {
    if (isEditing) {
      if (onSubmit) onSubmit();
    } else {
      // create a new comment or reply using context
      addNewComment(parentId, text, replyingToUsername);
    }
    setText("");
  }

  return (
    <div className={`${styles.layout} ${isEditing ? styles.editing : ""}`}>
      <img src={img} alt="avatar" />
      <div className={styles.inputContainer}>
        <textarea
          value={text}
          onChange={handleInput}
          placeholder={
            replyingToUsername ? `@${replyingToUsername}` : "Add a comment..."
          }
          className={styles.textarea}
        />
        <div className={styles.buttonsContainer}>
          <button onClick={handleButton} className={styles.primaryButton}>
            {isEditing ? "UPDATE" : parentId == null ? "SEND" : "REPLY"}
          </button>
          {isEditing && onCancel && (
            <button onClick={onCancel} className={styles.cancelButton}>
              CANCEL
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default WrittingComment;
