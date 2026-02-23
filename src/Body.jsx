import styles from "./Body.module.css";
import { useDataContext } from "./Context";

function Body({ comment, onDelete, onEdit }) {
  const { content, createdAt, user, replyingTo } = comment;
  const { currentUser, resolveIcon, resolveAvatar, setReplyTo } =
    useDataContext();

  const isYou = user.username === currentUser.username;
  const image = resolveAvatar(user.image.png);
  const replyIcon = resolveIcon("./images/icon-reply.svg");
  const deleteIcon = resolveIcon("./images/icon-delete.svg");
  const editIcon = resolveIcon("./images/icon-edit.svg");

  function hanldeReplyClick() {
    setReplyTo(user.username);
  }

  function handleDeleteClick() {
    if (onDelete) onDelete();
  }

  function handleEditClick() {
    if (onEdit) onEdit();
  }

  const actions = !isYou ? (
    <button className={styles.actionButton} onClick={hanldeReplyClick}>
      <img src={replyIcon} alt="" />
      Reply
    </button>
  ) : (
    <div className={styles.deleteEdit}>
      <button
        type="button"
        className={styles.del}
        onClick={handleDeleteClick}
      >
        <img src={deleteIcon} alt="" />
        Delete
      </button>
      <button type="button" className={styles.edit} onClick={handleEditClick}>
        <img src={editIcon} alt="" />
        Edit
      </button>
    </div>
  );

  return (
    <>
      <div className={styles.commentBody}>
        <div className={styles.header}>
          <img src={image} alt={user.username} />
          <h4>{user.username}</h4>
          {isYou && <span className={styles.you}>you</span>}
          <span>{createdAt}</span>
        </div>

        <div className={styles.body}>
          {replyingTo !== undefined && (
            <>
              <span className={styles.replyingTo}>@{replyingTo}</span>{" "}
            </>
          )}
          <span className={styles.content}>{content}</span>
        </div>
        <div className={styles.actions}>{actions}</div>
      </div>
    </>
  );
}

export default Body;
