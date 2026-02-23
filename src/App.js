import "./App.css";
import styles from "./App.module.css";
import Comment from "./Comment";
import { useDataContext } from "./Context";
import ReplyComposer from "./ReplyComposer";

function App() {
  const data = useDataContext();
  const { comments, addComment } = data;

  return (
    <div className={styles.appContainer}>
      <ul className={styles.commentsList}>
        {comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </ul>
      <div className={styles.composerDock}>
        <ReplyComposer
          buttonLabel="SEND"
          defaultText=""
          placeholder="Add a comment..."
          onSubmitText={(newCommentText) => addComment(newCommentText)}
        />
      </div>
    </div>
  );
}

export default App;
