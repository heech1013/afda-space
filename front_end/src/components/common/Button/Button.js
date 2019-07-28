import React from 'react';
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const Button = ({
  children, theme = 'default', to, onClick, location
}) => {
  const Element = to ? Link : Div;
  const clicked = to ? location.pathname.split('/')[1] === to.split('/')[1] : null;
  return (
    <Element
      className={cx('button', theme, { clicked })}
      to={to}
      onClick={onClick}>
      {children}
    </Element>
  )
};

export default withRouter(Button);