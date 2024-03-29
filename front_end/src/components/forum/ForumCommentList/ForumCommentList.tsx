import React from "react";
import styles from "./ForumCommentList.scss";
import classNames from "classnames/bind";
import format from "date-fns/format";
import { Link } from "react-router-dom";

interface CommentProps {
  nick: string;
  createdAt: string;
  body: string;
}

interface ForumCommentListProps {
  type: string;
  comments: any;
}

const cx = classNames.bind(styles);

const Comment = ({ nick, createdAt, body }: CommentProps) => (
  <div className={cx("comment")}>
    <Link className={cx("nick")} to={`/profile/${nick}`}>
      {nick}
    </Link>
    <span className={cx("createdAt")}>{createdAt}</span>
    <div className={cx("body")}>{body}</div>
  </div>
);

const ForumCommentList = ({ type, comments }: ForumCommentListProps) => {
  let row;
  if (type === "center") {
    row = "후기";
  } else if (type === "station") {
    row = "답변";
  }

  const commentList = comments.map((comment: any) => {
    const { id, createdAt, body, user } = comment.toJS();
    const { profile } = user;
    const { nick } = profile;

    return (
      <div>
        <Comment
          key={id}
          nick={nick}
          createdAt={format(createdAt, "YYYY.MM.DD")}
          body={body}
        />
        <hr className={cx("hr")} />
      </div>
    );
  });

  return (
    <div className={cx("forum-comment-list")}>
      <div className={cx("row")}>{row}</div>
      <hr className={cx("hr")} />
      {commentList}
    </div>
  );
};

export default ForumCommentList;
