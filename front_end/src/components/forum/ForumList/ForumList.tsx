import React from "react";
import styles from "./ForumList.scss";
import classNames from "classnames/bind";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import Button from "components/common/Button";

interface ContentItemProps {
  pathname: string;
  id: string;
  count: string;
  createdAt: string;
  si: string;
  gu: string;
  centerName: string;
  doctorName: string;
  title: string;
}

const cx = classNames.bind(styles);

const ContentItem = ({
  pathname,
  id,
  count,
  createdAt,
  si,
  gu,
  centerName,
  doctorName,
  title,
}: ContentItemProps) => {
  let row;

  if (pathname === "/center") {
    row = (
      <Link className={cx("content-link")} to={`${pathname}/${id}`}>
        <span className={cx("area")}>{si + " " + gu}</span>
        <span className={cx("center-name")}>{centerName}</span>
        <span className={cx("doctor-name")}>{doctorName}</span>
        <span className={cx("eval-count")}>{count}</span>
      </Link>
    );
  } else if (pathname === "/station") {
    row = (
      <div>
        <div className={cx("content-title-block")}>
          <Link className={cx("content-link")} to={`${pathname}/${id}`}>
            <span className={cx("title")}>{title}</span>
          </Link>
        </div>
        <div className={cx("answer-count")}>{count}</div>
        <div className={cx("content-createdAt")}>{createdAt}</div>
      </div>
    );
  }

  return (
    <div>
      <div className={cx("content-item")}>{row}</div>
      <hr className={cx("content-hr")} />
    </div>
  );
};

interface ForumListProps {
  contents: any;
  location: any;
  onModal: () => void;
  buttonString: string;
}

const ForumList: any = ({
  contents,
  location,
  onModal,
  buttonString,
}: ForumListProps) => {
  const row =
    location.pathname === "/center" ? (
      <div className={cx("row")}>
        <span className={cx("row-area")}>{"지역"}</span>
        <span className={cx("row-center-name")}>{"기관명"}</span>
        <span className={cx("row-doctor-name")}>{"전문의 / 상담사 이름"}</span>
        <span className={cx("row-eval-count")}>{"평가 수"}</span>
      </div>
    ) : location.pathname === "/station" ? (
      <div className={cx("row")}>
        <span className={cx("row-title")}>{"주제"}</span>
        <span className={cx("row-answer-count")}>{"답변 수"}</span>
        <span className={cx("row-createdAt")}>{"등록 일자"}</span>
      </div>
    ) : null;

  const contentList = contents.map((content: any) => {
    const {
      id,
      count,
      createdAt,
      si = null,
      gu = null,
      centerName = null,
      doctorName = null,
      title = null,
    } = content.toJS();

    return (
      <ContentItem
        id={id}
        key={id}
        pathname={location.pathname}
        count={count}
        createdAt={createdAt}
        // center
        si={si}
        gu={gu}
        centerName={centerName}
        doctorName={doctorName}
        // station
        title={title}
      />
    );
  });

  return (
    <div className={cx("station-main-frame")}>
      <div className={cx("station-main-button")}>
        <Button theme={"addToMyProfile"} onClick={onModal}>
          {buttonString}
        </Button>
      </div>

      <div className={cx("forum-list")}>
        {row}
        <hr className={cx("row-hr")} />
        {contentList}
      </div>
    </div>
  );
};

export default withRouter(ForumList);
