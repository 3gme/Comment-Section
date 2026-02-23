import { useEffect, useRef, useState } from "react";
import { useDataContext } from "./Context";
import styles from "./ReplyComposer.module.css";

function ReplyComposer({
  initialValue,
  buttonLabel = "REPLY",
  onReply,
  id,
  commentID,
  defaultText,
  onSubmitText,
  placeholder = "Add a reply...",
  autoFocusInput = false,
}) {
  const [replyText, setReplyText] = useState(
    defaultText ?? `@${initialValue} `,
  );
  const textAreaRef = useRef(null);
  const { currentUser, resolveAvatar } = useDataContext();
  const avatar = resolveAvatar(currentUser.image.png);

  useEffect(() => {
    if (!autoFocusInput || !textAreaRef.current) return;

    textAreaRef.current.focus();
    const textLength = textAreaRef.current.value.length;
    textAreaRef.current.setSelectionRange(textLength, textLength);
  }, [autoFocusInput]);

  function handleSubmit(event) {
    event.preventDefault();
    const value = replyText.trim();
    if (!value) return;
    if (onSubmitText) {
      onSubmitText(value);
      setReplyText(defaultText);
      return;
    }

    function getReplycontent(content) {
      content = content.split(" ");
      if (content[0] === initialValue || content[0] === `@${initialValue}`)
        return content.splice(1).join(" ");

      return content.join(" ");
    }

    const reply = {
      content: getReplycontent(replyText),
      createdAt: "Just now",
      id: crypto.randomUUID(),
      replyingTo: initialValue,
      score: 0,
      user: currentUser,
    };

    // reply to comment
    if (onReply && commentID === undefined) onReply(id, reply);

    // reply to reply
    if (onReply && commentID) onReply(commentID, id, reply);

    setReplyText("");
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <img
          src={avatar}
          alt={currentUser.username}
          className={styles.avatar}
        />
        <textarea
          ref={textAreaRef}
          className={styles.input}
          value={replyText}
          onChange={(event) => setReplyText(event.target.value)}
          rows={2}
          placeholder={placeholder}
        />
        <button type="submit" className={styles.button}>
          {buttonLabel}
        </button>
      </form>
    </div>
  );
}

export default ReplyComposer;
