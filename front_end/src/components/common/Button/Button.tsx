import React from "react";
import styles from "./Button.scss";
import classNames from "classnames/bind";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

const cx = classNames.bind(styles);

interface DivProp {
  children: any;
  rest?: any[];
}

type ButtonProp = RouteComponentProps & {
  children?: React.ReactNode;
  theme?: string;
  to?: any;
  onClick?: () => void;
};

function Div({ children, ...rest }: DivProp) {
  return <div {...rest}>{children}</div>;
}

function Button({
  children,
  theme = "default",
  to,
  onClick,
  location,
}: ButtonProp) {
  const Element: any = to ? Link : Div;
  const clicked = to
    ? location.pathname.split("/")[1] === to.split("/")[1]
    : null;

  return (
    <Element
      className={cx("button", theme, { clicked })}
      to={to}
      onClick={onClick}
    >
      {children}
    </Element>
  );
}

export default withRouter(Button);
