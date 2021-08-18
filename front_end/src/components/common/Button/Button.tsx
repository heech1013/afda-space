import React, { FC } from 'react'
import styles from './Button.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

interface DivProp {
  children: any;
  rest?: any[];
}
interface ButtonProp {
  children?: any;
  theme?: string;
  to?: any;
  onClick?: any;
  location?: any;
}

// const Div = ({ children,...rest }: DivProp): JSX.Element => <div {...rest}>{children}</div>
const Div: FC<DivProp> = ({ children, ...rest }) => <div {...rest}>{children}</div>

const Button: FC<ButtonProp> = ({
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