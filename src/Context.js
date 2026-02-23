import { createContext, useContext, useEffect, useState } from "react";
import initialData from "./data.json";

const dataContext = createContext();
const STORAGE_KEY = "interactive-comments-data";

export default function Context({ children }) {
  const [data, setData] = useState(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      return savedData ? JSON.parse(savedData) : initialData;
    } catch {
      return initialData;
    }
  });
  const [replyTo, setReplyTo] = useState(null);
  const { comments, currentUser } = data;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const avatarsContext = require.context(
    "./images/avatars",
    false,
    /\.(png|webp)$/,
  );
  const iconContext = require.context("./images", false, /\.(png|webp|svg)$/);

  function resolveAvatar(relativePath) {
    const fileName = relativePath?.split("/").pop();
    if (!fileName) return "";

    try {
      return avatarsContext(`./${fileName}`);
    } catch {
      return "";
    }
  }
  function resolveIcon(relativePath) {
    const fileName = relativePath?.split("/").pop();
    if (!fileName) return "";

    try {
      return iconContext(`./${fileName}`);
    } catch {
      return "";
    }
  }

  function addReplyToComment(id, reply) {
    setData((prevData) => {
      return {
        ...prevData,
        comments: prevData.comments.map((comment) => {
          if (comment.id === id) {
            return { ...comment, replies: [...comment.replies, reply] };
          }
          return comment;
        }),
      };
    });
    setReplyTo(null);
  }

  function addReplyToReply(commentID, replyId, reply) {
    setData((prevData) => {
      return {
        ...prevData,
        comments: prevData.comments.map((comment) => {
          if (comment.id === commentID) {
            const index = comment.replies.findIndex(
              (reply) => reply.id === replyId,
            );
            if (index === -1) return comment;
            return {
              ...comment,
              replies: [
                ...comment.replies.slice(0, index + 1),
                reply,
                ...comment.replies.slice(index + 1),
              ],
            };
          }
          return comment;
        }),
      };
    });
    setReplyTo(null);
  }

  function addComment(content) {
    const newComment = {
      id: crypto.randomUUID(),
      content,
      createdAt: "Just now",
      score: 0,
      user: currentUser,
      replies: [],
    };

    setData((prevData) => ({
      ...prevData,
      comments: [...prevData.comments, newComment],
    }));
  }

  function deleteReply(commentID, replyID) {
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.map((comment) => {
        if (comment.id !== commentID) return comment;

        return {
          ...comment,
          replies: comment.replies.filter((reply) => reply.id !== replyID),
        };
      }),
    }));
  }

  function updateReply(commentID, replyID, updatedContent) {
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.map((comment) => {
        if (comment.id !== commentID) return comment;

        return {
          ...comment,
          replies: comment.replies.map((reply) => {
            if (reply.id !== replyID) return reply;
            return { ...reply, content: updatedContent };
          }),
        };
      }),
    }));
  }

  function deleteComment(commentID) {
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.filter((comment) => comment.id !== commentID),
    }));
  }

  function updateComment(commentID, updatedContent) {
    setData((prevData) => ({
      ...prevData,
      comments: prevData.comments.map((comment) => {
        if (comment.id !== commentID) return comment;
        return { ...comment, content: updatedContent };
      }),
    }));
  }

  return (
    <dataContext.Provider
      value={{
        data,
        comments,
        currentUser,
        replyTo,
        setData,
        resolveAvatar,
        resolveIcon,
        setReplyTo,
        addComment,
        addReplyToComment,
        addReplyToReply,
        deleteReply,
        updateReply,
        deleteComment,
        updateComment,
      }}
    >
      {children}
    </dataContext.Provider>
  );
}

export function useDataContext() {
  const Context = useContext(dataContext);
  if (Context === undefined)
    throw new Error("using context out of scope 'dataContext'");
  return Context;
}
