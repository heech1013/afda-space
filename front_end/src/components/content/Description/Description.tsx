import React from "react";
import classNames from "classnames/bind";
import styles from "./Description.scss";

interface DescriptionProps {
  nameKr: string;
  content: string;
}

const cx = classNames.bind(styles);

function Description({ nameKr, content }: DescriptionProps) {
  return (
    <div className={cx("description")}>
      <div className={cx("title")}>{nameKr}(이)란?</div>
      <div className={cx("content")}>{content}</div>
    </div>
  );
}

export default Description;
